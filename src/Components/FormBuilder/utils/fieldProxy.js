import {v4 as uuidv4} from "uuid";
import {coreFieldSchema, typeSpecificSchemaProperties} from "./formSchemas.js";


export default function createFieldProxy(field, api, index) {
    return {

        get id(){
            return field.id;
        },
        get title() {
            return field.title;
        },

        set title(value) {
            api.editField(index, {title: value})
        },

        get description() {
            return field.description;
        },
        set description(value) {
            api.editField(index, {description: value})
        },

        get options() {
            return field.options
        },

        set options(value) {
            api.editField(index, {options: value})
        },

        get isRequired() {
            return field.isRequired;
        },
        set isRequired(value) {
            api.editField(index, {isRequired: value})
        },

        get type() {
            return field.type;
        },
        set type(value) {
            api.editField(index, {type: value})
        },

        get validationRules() {
            return field.validationRules;
        },

        set valdationRules(value) {
            api.editField(index, {validationRules: value})
        },

        get errors() {
            return api.errors[index]
        },

        set errors(value) {
            api.errors[index] = value;
        },

        removeOption(option) {
            api.editField(index, {options: field.options.filter(o => o !== option)});
        },

        addOption(value) {
            if (value === undefined || value === "") return;
            api.editField(index, {options: [...field.options, {id: uuidv4(), fieldId: field.id, value: value}]});
        },

        updateOptionAt(i, newValue) {
            const newOptions = [...field.options];
            newOptions[i] = newValue;
            api.editField(index, {options: newOptions});
        },

        setType(newType) {
            // Preserve the current options if possible
            if (field.type === newType) {
                return field;
            }
            const newField = Object.keys(coreFieldSchema).reduce((acc, key) => {
                acc[key] = field[key];
                return acc;
            }, {});

            api.editField(index, {
                ...newField,
                ...(typeSpecificSchemaProperties[newType] || {}),
                options:
                    (["checkboxGroup", "radioGroup"].includes(field.type) &&
                        ["checkboxGroup", "radioGroup"].includes(newType))
                        ? field.options
                        : [],
            });
        },

        setValidationRule(i, newValue) {
            api.editField(index, {
                ...field,
                validationRules: field.validationRules.map((rule, j) =>
                    j === i
                        ? {...rule, value: newValue}
                        : rule
                ),
            });
        },

        resetError() {
            api.resetError(index);
        },

        delete() {
            api.removeField(index);
        },

    }
}