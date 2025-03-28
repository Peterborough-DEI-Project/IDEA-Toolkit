import {
  Text,
  RadioGroup,
  CheckboxGroup,
  SwitchWithLabel,
} from "./components/index.js";
import PropTypes from "prop-types";

FieldComponentRouter.propTypes = {
  type: PropTypes.string.isRequired,
};

const components = {
  text: Text,
  radioGroup: RadioGroup,
  checkboxGroup: CheckboxGroup,
  boolean: SwitchWithLabel,
};

export default function FieldComponentRouter({ type, ...props }) {
  const Component = components[type];
  if (!Component) {
    console.warn(`Unsupported field type: ${type}`);
    return null;
  }

  return (
    <>
      <Component {...props} />
    </>
  );
}
