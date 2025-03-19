import React from 'react';
import PropTypes from "prop-types";
import settingsRegistry from '../../utils/settingsComponentRegistry.js'
import {getConfigurationSettings} from "../../../../Utils/API.js";

SettingsEditor.propTypes = {
    form: PropTypes.any,
}
const settings = await getConfigurationSettings();

function SettingsEditor({form}) {
    const handleChange = (id, e) => {
        let value;
        if (e?.target) {
            // DOM event
            value = e.target.type === 'checkbox' ? form.editSetting(id, e.target.checked) : form.editSetting(id, e.target.value)

            return;
        } else {
            // Direct value
            value = e;
        }

        form.editSetting(id, value);
    }
    return (
        // todo: Make this semantic and accessible (correct labels, etc)
        <>
            <div className="flex flex-col gap-5 rounded-lg  my-5 mx-10 p-8 ">
                <h5 className="font-semibold text-2xl text-gray-800 border-b pb-2">Settings</h5>
                {form.schema.settings.map(setting => {
                    const settingSchema = settings.find((x) => x.id === setting.settingId);
                    const registryEntry = settingsRegistry.getComponent(settingSchema.registry_key);
                    const Component = registryEntry.component;
                    const props = registryEntry.props;
                    return (<div className="flex flex-col gap-2 " key={`setting-${settingSchema.id}`}>
                            <div>
                                <label className="font-semibold text-gray-700">{settingSchema.label}</label>
                                {/*Todo: turn this into a tooltip*/}
                                <p className="text-sm text-gray-600">{settingSchema.tooltip}</p>
                            </div>

                            <Component
                                {...props}
                                value={convertType(setting.value || settingSchema.defaultValue)}
                                onChange={(value) => form.editSetting(setting.settingId, value)}
                            />
                        </div>

                    )
                })}
            </div>

        </>

    );
}

function convertType(value, type) {
    let newValue = value;
    switch (String(type).toLowerCase()) {
        case 'string':
            newValue = value;
            break;
        case 'number':
            newValue = Number(value);
            break;
        case 'boolean':
            newValue = value === 'true';
            break;
        default:
            return value;
    }

    return newValue;
}

export default SettingsEditor;