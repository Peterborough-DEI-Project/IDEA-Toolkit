-- noinspection SqlNoDataSourceInspectionForFile

-- fn to validate that insert operation doesn't violate insert rules
-- Currently, only validates that the operation doesn't violate max submission rules

CREATE OR REPLACE FUNCTION assessments.validate_submission_insert() RETURNS trigger AS
$validate_submission_insert$

DECLARE
max_submission_id        uuid := (SELECT id
                                      FROM assessments.settings_config
                                      WHERE registry_key = 'maxSubmissions');
    max_submission_value     int;
    current_submission_count int;

BEGIN

    -- Checks if the setting id (within settings_config) exists
    IF max_submission_id IS NULL THEN
        RAISE EXCEPTION 'Setting for maxSubmissions not found. Please contact support.';
END IF;

    -- select the value from the template's settings into local variable
SELECT value::int
INTO max_submission_value
FROM assessments.template_settings
WHERE setting_id = max_submission_id
  AND template_id = NEW.template_id;

-- if max value is null or 0, indicates there is no limit, proceed as normal
IF max_submission_value IS NULL OR max_submission_value = 0 THEN
        RETURN NEW;
END IF;

    -- Get the current number of submissions
SELECT COUNT(*)
INTO current_submission_count
FROM assessments.submissions
WHERE template_id = NEW.template_id
  AND user_id = NEW.user_id;

-- Check if the user has uploaded too many submissions based on the max submission count
IF (max_submission_value > 0) AND (current_submission_count >= max_submission_value) THEN
        RAISE EXCEPTION 'Operation violates assessment rule: Max submissions exceeded.';
END IF;

RETURN NEW;
END;

$validate_submission_insert$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER validate_submission_insert
    BEFORE INSERT
    ON assessments.submissions
    FOR EACH ROW
EXECUTE FUNCTION assessments.validate_submission_insert();
