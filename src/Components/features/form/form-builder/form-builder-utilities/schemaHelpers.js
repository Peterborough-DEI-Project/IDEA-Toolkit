
import { v4 as uuidv4 } from "uuid";

// Verifies that important fields are filled (form builder)
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

    // Checks that multiple choice groups have at least one option
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


const createResponseSchema = (schema) => {
  if (!schema || typeof schema !== "object" || !schema.fields) {
    console.error("Invalid schema format", schema);
    return [];
  }

  return Object.entries(schema.fields).map(([id, field]) => {
    let value;

    switch (field.type) {
      case "radioGroup":
        value = field.options[0]?.id;
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

export { validateSchema,  createResponseSchema };
