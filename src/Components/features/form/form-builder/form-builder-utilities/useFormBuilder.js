import {useMemo, useState} from "react";
import {defaultFieldSchemas} from "./formSchemas.js";
import {v4 as uuidv4} from "uuid";
import {validateSchema as validationHelper} from "./schemaHelpers.js";
import createFieldProxy from "./fieldProxy.js";
import {getConfigurationSettings} from '/src/Utils/API.js';
import CaseConverter from "/src/Utils/CaseConverter.js";

const settings = CaseConverter.fromJSON(((await getConfigurationSettings()))).toCamelCase();


const useFormBuilder = (data = null) => {
    const [errors, setErrors] = useState({}); // State to manage validation errors

    const [formSchema, setFormSchema] = useState(data || {
        id: uuidv4(), // Unique ID for the form schema
        title: "", // Title of the form
        description: "", // Description of the form
        fields: [], // List of fields in the form
        settings: settings.map((setting)=> ({id: uuidv4(), settingId: setting.id, value: setting.defaultValue})),
    },);

    const api = useMemo(() => ({
        schema: formSchema,
        errors: errors,
        setSchema: (schema) => setFormSchema(schema),
        setTitle: (title) => setFormSchema(prev => ({...prev, title})),
        setDescription: (description) => setFormSchema(prev => ({...prev, description})),

        addField: (type) => {
            if (!type) return;
            setFormSchema((prev) => ({
                ...prev, fields: [...prev.fields, {
                    ...defaultFieldSchemas[type],   // Uses default schema for the specified field type
                    id: uuidv4(),                   // Assign a unique ID to the field
                    template_id: formSchema.id,
                }],
            }));
        },

        // Updates a specific field in the form schema by field ID
        // input-fields must be the entire field
        editField: (fieldId, updatedProperties) => {
            api.resetError(fieldId);
            if (!updatedProperties) return;
            setFormSchema((prev) => ({
                ...prev,
                fields: prev.fields.map((field, index) => index === Number(fieldId) ? {...field, ...updatedProperties} : field),
            }));
        },

        // Removes a field by filtering out the specified Id
        removeField: (fieldId) => {
            setFormSchema((prev) => ({
                ...prev, fields: prev.fields.filter((_, index) => index !== Number(fieldId)),
            }));
        },

        // Resets error state for a specific key or field
        resetError: (index = null, key) => {
            setErrors((prev) => {
                if (key === undefined) {
                    return {
                        ...prev, [index]: "", // Reset error for the given index
                    };
                }
                if (index !== null) {
                    return {
                        ...prev, [index]: {
                            ...prev[index], [key]: "", // Reset specific error based on key
                        },
                    };
                }
                return {...prev, [key]: ""}; // Reset error for the given key
            })
        },

        validateSchema: () => {
            let errorList = validationHelper(formSchema); // Get validation errors
            if (Object.keys(errorList).length > 0) {
                setErrors(validationHelper(formSchema));
                return true;
            }
            return false;
        },

        getField: (index) => {
            return (createFieldProxy(formSchema.fields[index], api, index))
        },

        editSetting(settingId, value) {
            const newSettings = formSchema.settings;
            newSettings.find((x)=>x.settingId === settingId).value = value;

            setFormSchema((prev) => ({
                ...prev, settings: newSettings
            }));
        },

    }), [formSchema, errors]);


    return api;
};

export default useFormBuilder;
