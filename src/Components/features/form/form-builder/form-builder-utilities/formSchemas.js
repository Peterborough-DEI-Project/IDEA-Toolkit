
// Defines the default shapes of the form schemas

const fieldTypes = ["text", "radioGroup", "checkboxGroup", "boolean"];
const coreFieldSchema = {
  id: "",
  title: "",
  description: "",
  isRequired: false,
};

const typeSpecificSchemaProperties = {
  text: {
    validationRules: [
      {
        id: "multiline",
        value: false,
        label: "Long answer",
        tooltip: "Allow users to enter multiple lines of text",
      },
    ],
    type: "text",
  },
  radioGroup: {
    options: [],
    validationRules: [
      {
        id: "allowCustom",
        value: false,
        label: "Allow Custom Entry",
        tooltip: "Allow users to add custom options",
      },
    ],
    type: "radioGroup",
  },
  checkboxGroup: {
    options: [],
    validationRules: [
      {
        id: "allowCustom",
        value: false,
        label: "Allow Custom Entry",
        tooltip: "Allow users to add custom options",
      },
    ],
    type: "checkboxGroup",
  },
  boolean: {
    type: "boolean",
    validationRules:[],
  },
};

const defaultFieldSchemas = {
  text: {
    ...coreFieldSchema,
    ...typeSpecificSchemaProperties["text"],
  },
  radioGroup: {
    ...coreFieldSchema,
    ...typeSpecificSchemaProperties["radioGroup"],
  },
  checkboxGroup: {
    ...coreFieldSchema,
    ...typeSpecificSchemaProperties["checkboxGroup"],
  },
  boolean: {
    ...coreFieldSchema,
    ...typeSpecificSchemaProperties["boolean"],
  },
};

export {
  coreFieldSchema,
  typeSpecificSchemaProperties,
  defaultFieldSchemas,
  fieldTypes,
};
