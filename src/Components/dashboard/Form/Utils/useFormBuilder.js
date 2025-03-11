import {useState} from "react";
import {defaultFieldSchemas} from "./formSchemas.js";
import {v4 as uuidv4} from "uuid";
import {validateSchema as validationHelper} from "./schemaHelpers.js";

const useFormSchema = (data = null) => {
    const [errors, setErrors] = useState({}); // State to manage validation errors

    const [formSchema, setFormSchema] = useState(
        data || {
            id: uuidv4(), // Unique ID for the form schema
            title: "", // Title of the form
            description: "", // Description of the form
            fields: [], // List of fields in the form
        },
    );

    // Used for handling changes to the form's properties (excludes fields)
    const handleFormChange = (key, value) => {
        resetError(key); // Clear any existing error for the key

        setFormSchema((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Adds a new field to the form schema based on the provided type
    const addField = (type) => {
        if (!type) return;

        setFormSchema((prev) => ({
            ...prev,
            fields: [...prev.fields, {
                ...defaultFieldSchemas[type],   // Uses default schema for the specified field type
                id: uuidv4(),                   // Assign a unique ID to the field
            }],
        }));
    };

    // Updates a specific field in the form schema by field ID
    // Input must be the entire field
    const editField = (fieldId, updatedProperties) => {
        if (!updatedProperties) return;
        setFormSchema((prev) => ({
            ...prev,
            fields: prev.fields.map((field, index) =>
                index === Number(fieldId) ? {...field, ...updatedProperties} : field
            ),
        }));
    };

    // Removes a field by filtering out the specified Id
    const removeField = (fieldId) => {
        setFormSchema((prev) => ({
            ...prev,
            fields: prev.fields.filter((_, index) => index !== Number(fieldId)),
        }));
    };

    // Resets error state for a specific key or field
    const resetError = (index = null, key) => {
        setErrors((prev) => {
            if (key === undefined) {
                return {
                    ...prev,
                    [index]: "", // Reset error for the given index
                };
            }
            if (index !== null) {
                return {
                    ...prev,
                    [index]: {
                        ...prev[index],
                        [key]: "", // Reset specific error based on key
                    },
                };
            }
            return {...prev, [key]: ""}; // Reset error for the given key
        });
    };

    // Validates the form schema and updates error state
    function validateSchema() {
        let errorList = validationHelper(formSchema); // Get validation errors
        if(Object.keys(errorList).length > 0){
            setErrors(validationHelper(formSchema));
            return true;
        }
        return false;
    }

    // Expose API for managing form schema
    return {
        formSchema,
        setFormSchema,
        addField,
        editField,
        removeField,
        handleFormChange,
        errors,
        resetError,
        validateSchema,
    };
};

export default useFormSchema;
