-- noinspection SqlNoDataSourceInspectionForFile

/*
  Supabase Function: assessments.update_assessment
  Updated: 03-12-2025
  Status: Implemented
  ------------------------------------------------

  Description:
  This function is designed for updating assessments in the `assessments` schema
  within Supabase. The function updates metadata, fields, and options stored in
  the database. Instead of the client performing separate operations, this function
  updates assessments, removing and/or deleted fields/options.

  It is important to use this function to ensure that fields and options stay intact across
  updates (unless deleted by the user), as in the future, the reporting feature may
  reference these rows directly.

  IMPORTANT NOTE:
    -   This file is NOT the function itself and will not be used by the application,
        it is here for documentation purposes only.
    -   If you need to edit or modify this function, ensure that changes are made directly within
        the Supabase dashboard or your SQL migration files.

    Key Details:
  - Location: This function resides in the `assessments` schema in Supabase.
  - How to Call: The function must be called by a direct reference to the schema:
    e.g., `assessments.update_assessment(payload JSON)`.
  - Input Requirement: The function accepts a single JSON payload with the
    structure outlined below.

  Input JSON Structure:
  The function's input JSON must include the following keys:
  1. `metadata`: Contains the template's metadata and includes required properties:
      - `id` (UUID): Template ID.
      - `title` (TEXT): Title of the assessment.
      - `description` (TEXT): Description of the assessment.
      - `status` (TEXT): The status of the assessment (mapped to `assessment_status` enum).
  2. `fields`: An array of field objects. Each object requires:
      - `id` (UUID): Field ID.
      - `title` (TEXT): Name of the field.
      - `description` (TEXT): Field description.
      - `is_required` (BOOLEAN): Is the field required?
      - `type` (ENUM): The field type (mapped to `assessments.field_types` enum).
      - `validation_rules` (JSONB): Validation rules for the field.
      - `sequence_order` (INTEGER): The order of the fields.
      - `template_id` (UUID): Template ID associated with the field.
  3. `options`: An array of option objects. Each object requires:
      - `id` (UUID): Option ID.
      - `field_id` (UUID): Field ID the option belongs to.
      - `value` (TEXT): Option value.
      - `sequence_order` (INTEGER): Order of the option.

    Operations Performed:
     - UPDATE: `assessments.templates` table
     - INSERT or UPDATE: `assessments.template_fields` and `assessments.template_options` table.
     - DELETE: `assessments.template_fields` `assessments.template_options` where old options are not present in new assessment data.

  Example Usage:
  ```sql
  SELECT assessments.update_assessment(
      '{
          "metadata": {
              "id": "template-id-uuid",
              "title": "Assessment Title",
              "description": "Description of the assessment",
              "status": "draft"
          },
          "fields": [
              {
                  "id": "field-id-uuid",
                  "template_id": "template-id-uuid",
                  "title": "Field Title",
                  "description": "Field Description",
                  "is_required": true,
                  "type": "text",
                  "validation_rules": {},
                  "sequence_order": 1
              }
          ],
          "options": [
              {
                  "id": "option-id-uuid",
                  "field_id": "field-id-uuid",
                  "value": "Option Value",
                  "sequence_order": 1
              }
          ]
      }'::json
  );
  ```
*/

CREATE OR REPLACE FUNCTION assessments.update_assessment(payload JSON)
    RETURNS void
AS $$

DECLARE
field  JSON;
option JSON;
i      INTEGER := 0;
BEGIN

-- Update the template metadata (assessment.templates)
WITH data AS (SELECT payload -> 'metadata' AS metadata)
    UPDATE assessments.templates
        SET title       = data.metadata ->> 'title',
            description = data.metadata ->> 'description',
            status      = (data.metadata ->> 'status')::assessments.assessment_status
        FROM data
        WHERE assessments.templates.id = (data.metadata ->> 'id')::uuid;


--Iterate through each field in the payload
FOR field IN SELECT * FROM JSON_ARRAY_ELEMENTS(payload -> 'fields')

    LOOP
    -- Insert into table or update on conflict
    INSERT INTO assessments.template_fields(id,
                                            template_id,
                                            title,
                                            description,
                                            is_required,
                                            type,
                                            validation_rules,
                                            sequence_order)
             VALUES (
                 (field ->> 'id')::uuid,
                 (field ->> 'template_id')::uuid,
                 (field ->> 'title')::text,
                 (field ->> 'description')::text,
                 (field ->> 'is_required')::bool,
                 (field ->> 'type')::assessments.field_types,
                 (field ->> 'validation_rules')::jsonb,
                 COALESCE((field ->> 'sequence_order')::integer, i)
                 )

             -- If field exists update values
             ON CONFLICT (id)
                 DO UPDATE
                     SET title        = excluded.title,
                     description      = excluded.description,
                     is_required      = excluded.is_required,
                     type             = excluded.type,
                     validation_rules = excluded.validation_rules,
                     sequence_order   = excluded.sequence_order;
END LOOP;

-- Delete fields that aren't in the new fields
DELETE
FROM assessments.template_fields tf
    WHERE tf.template_id = (SELECT payload -> 'template' ->> 'id')::uuid
    AND tf.id NOT IN (
        SELECT (new_field ->> 'id')::uuid
        FROM JSON_ARRAY_ELEMENTS(payload -> 'fields') AS new_field
        );


-- Iterate through options and perform the same operations
FOR option IN SELECT * FROM JSON_ARRAY_ELEMENTS(payload -> 'options')
LOOP
    INSERT INTO assessments.template_options(id,
                                             field_id,
                                             value,
                                             sequence_order,
                                             created_at)
    VALUES (
        (option ->> 'id')::uuid,
        (option ->> 'field_id')::uuid,
        (option ->> 'value')::text,
        (option ->> 'sequence_order')::int,
        NOW()
        )

    ON CONFLICT (id)
        DO UPDATE
          SET value      = excluded.value,
          sequence_order = excluded.sequence_order;
END LOOP;

-- Delete old options
DELETE
FROM assessments.template_options op
    WHERE op.field_id IN (SELECT (payload -> 'fields' ->> 'id')::uuid)
    AND op.id NOT IN (SELECT (new_options ->> 'id')::uuid
        FROM JSON_ARRAY_ELEMENTS(payload -> 'options') AS new_options);

END;
$$ LANGUAGE plpgsql;
