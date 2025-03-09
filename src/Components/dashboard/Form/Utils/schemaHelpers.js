import {
  coreFieldSchema,
  fieldTypes,
  typeSpecificSchemaProperties,
} from "./formSchemas.js";
import { v4 as uuidv4 } from "uuid";
const validateSchema = (formSchema) => {
  let newErrors = {};
  if (!formSchema.title?.trim()) {
    newErrors["title"] = "Required";
  }
  formSchema.fields.forEach((field, index) => {
    if (!field.title?.trim()) {
      newErrors[index] = {
        ...(newErrors[index] || {}),
        title: "Required",
      };
    }
    if (
      (field.type === "checkboxGroup" || field.type === "radioGroup") &&
      (!field.options || field.options.length === 0)
    ) {
      newErrors[index] = {
        ...(newErrors[index] || {}),
        input: "At least one option is required",
      };
    }
  });
  return newErrors;
};

const createUiSchema = (schema) => {
  if (!schema || typeof schema !== "object" || !schema.fields) {
    console.error("Invalid schema format");
    return [];
  }

  return Object.entries(schema.fields).map(([id, field]) => ({
    id,
    title: field.title,
    description: field.description,
    type: field.type,
    ...(field.type === "radioGroup" || field.type === "checkboxGroup"
      ? { options: field.options }
      : {}),
  }));
};

const createResponseSchema = (schema) => {
  if (!schema || typeof schema !== "object" || !schema.fields) {
    console.error("Invalid schema format", schema);
    return [];
  }

  return Object.entries(schema.fields).map(([id, field]) => {
    let value;

    switch (field.type) {
      case "radioGroup":
        value = field.options[0].id;
        break;
      case "checkboxGroup":
        value = [];
        break;
      case "boolean":
        value = false;
        break;
      default:
        value = "";
    }

    return {
      responseId: uuidv4(),
      fieldId: field.id,
      title: field.title,
      type: field.type,
      value: value,
    };
  });
};

export { validateSchema, createUiSchema, createResponseSchema };
