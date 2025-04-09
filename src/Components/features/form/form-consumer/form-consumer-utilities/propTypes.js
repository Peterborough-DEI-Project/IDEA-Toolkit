import PropTypes from "prop-types";
import { fieldTypes } from "../form-builder/utils/formSchemas.js";

export const formSchemaShape = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      required: PropTypes.bool,
      validation_rules: PropTypes.arrayOf(PropTypes.object),
      type: PropTypes.oneOf(fieldTypes),
      options: PropTypes.arrayOf(PropTypes.object),
    }),
  ),
});

export const inputBaseShape = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  validation_rules: PropTypes.arrayOf(PropTypes.object),
};

export const selectionBaseShape = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string,
    }),
  ),
};
