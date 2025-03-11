import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
const schema = { id: "", title: "", description: "", fields: [] };

const fieldTypes = ["text", "radioGroup", "checkboxGroup", "boolean"];

const coreFieldSchema = {
  id: "",
  title: "",
  description: "",
  isRequired: false,
};

function genBaseSchema() {
  return {
    id: uuidv4(),
    title: "",
    description: "",
    isRequired: false,
  };
}

const schemaPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      isRequired: PropTypes.bool,
      validation: PropTypes.arrayOf(PropTypes.object),
      type: PropTypes.oneOf([fieldTypes]),
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string,
        }),
      ),
    }),
  ),
};
const typeSpecificSchemaProperties = {
  text: {
    validation: [
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
    validation: [
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
    validation: [
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
    validation:[],
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
  schema,
  coreFieldSchema,
  typeSpecificSchemaProperties,
  defaultFieldSchemas,
  fieldTypes,
  schemaPropTypes,
  genBaseSchema,
};
