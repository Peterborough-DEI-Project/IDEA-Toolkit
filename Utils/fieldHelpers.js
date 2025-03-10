import {
  coreFieldSchema,
  typeSpecificSchemaProperties,
} from "./formSchemas.js";
import { v4 as uuidv4 } from "uuid";

const modifyTitle = (field, newValue) => {
  if (typeof field === "undefined" || typeof newValue === "undefined") {
    return field;
  }
  return {
    ...field,
    title: newValue,
  };
};

const modifyDescription = (field, newValue) => {
  if (typeof field === "undefined" || typeof newValue === "undefined") {
    return field;
  }
  return {
    ...field,
    description: newValue,
  };
};

const changeType = (field, newType) => {
  if (!field || !newType) {
    throw new Error("Error modifying field type.");
  }
  if (field.type === newType) {
    return field;
  }

  const newField = Object.keys(coreFieldSchema).reduce((acc, key) => {
    acc[key] = field[key];
    return acc;
  }, {});

  return {
    ...newField,
    ...(typeSpecificSchemaProperties[newType] || {}),

    options:
      (field.type === "checkboxGroup" || field.type === "radioGroup") &&
      (newType === "checkboxGroup" || newType === "radioGroup")
        ? field.options
        : [],
  };
};

const modifyIsRequired = (field, newValue) => {
  if (typeof field === "undefined" || typeof newValue !== "boolean") {
    throw new Error("Error modifying isRequired.");
  }
  return {
    ...field,
    isRequired: newValue,
  };
};

const addOption = (field, newValue) => {
  if (typeof field === "undefined" || typeof newValue !== "string") {
    throw new Error("Error adding option.");
  }
  if (field.type !== "checkboxGroup" && field.type !== "radioGroup") {
    throw new Error("Error adding option, incorrect field type.");
  }
  const newId = uuidv4();
  return {
    ...field,
    options: [...field.options, { id: uuidv4(), label: newValue }],
  };
};

const removeOption = (field, oldOption) => {
  if (typeof field === "undefined") {
    console.warn("Error removing option, target value is undefined.");
  }
  if (field.type !== "checkboxGroup" && field.type !== "radioGroup") {
    console.warn("Error removing option, incorrect field type.");
  }
  return {
    ...field,
    options: [...field.options.filter((option) => option.id !== oldOption.id)],
  };
};

export {
  modifyTitle,
  modifyDescription,
  changeType,
  modifyIsRequired,
  removeOption,
  addOption,
};
