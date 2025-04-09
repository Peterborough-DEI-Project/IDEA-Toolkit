-- function expects:
-- submission_id
-- field_id

CREATE OR REPLACE FUNCTION assessments.validate_submission_field_insert()
    RETURNS trigger
AS
$validation_submission_field_insert$


BEGIN
    -- Note: FK relationship already validates if a submission exists
    -- Check if an entry exists for this submission field already
    IF (SELECT COUNT(*)
        FROM assessments.submission_fields
        WHERE submission_id = NEW.submission_id
          AND field_id = NEW.field_id) > 0
    THEN
        RAISE EXCEPTION 'Operation failed: A response already exists with the specified value';

END IF;

return NEW;

END;
$validation_submission_field_insert$ language plpgsql;

create or replace trigger validate_submission_insert
       before insert
              on assessments.submission_fields
              for each row
              execute function assessments.validate_submission_field_insert();