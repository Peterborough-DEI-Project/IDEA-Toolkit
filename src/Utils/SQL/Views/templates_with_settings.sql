CREATE VIEW templates_with_settings(template_id, title, label, value, registry_key, setting_id) AS
SELECT ts.template_id,
       t.title,
       sc.label,
       ts.value,
       sc.registry_key,
       ts.setting_id
FROM assessments.template_settings ts
         JOIN assessments.settings_config sc ON ts.setting_id = sc.id
         JOIN assessments.templates t ON ts.template_id = t.id;

COMMENT ON VIEW templates_with_settings IS 'Returns a template record and the respective settings within assessments.template_settings';

ALTER TABLE templates_with_settings
    OWNER TO postgres;

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON templates_with_settings TO authenticated;

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON templates_with_settings TO service_role;

GRANT SELECT ON templates_with_settings TO authenticator;

