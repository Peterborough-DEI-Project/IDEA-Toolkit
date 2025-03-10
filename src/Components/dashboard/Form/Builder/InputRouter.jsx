import OptionsEditor from "./FieldLayout/OptionsEditor.jsx";
import SwitchWithLabel from "../Input/SwitchWithLabel.jsx";
import PropTypes from "prop-types";
import Text from "../Input/Text.jsx";
import { addOption, removeOption } from "../Utils/fieldHelpers.js";

const inputComponents = {
  text: Text,
  radioGroup: OptionsEditor,
  checkboxGroup: OptionsEditor,
  boolean: SwitchWithLabel,
};

const inputHandlers = {
  text: (onChange, field) => (e) => onChange(e.target.value),
  radioGroup: (onChange, field) => {
    const handler = () => {};
    handler.add = (value) => onChange(addOption(field, value));
    handler.remove = (value) => onChange(removeOption(field, value));
    handler.changeSelection = (value) => onChange(value);
    return handler;
  },
  checkboxGroup: (onChange, field) => {
    const handler = () => {};
    handler.add = (value) => onChange(addOption(field, value));
    handler.remove = (value) => onChange(removeOption(field, value));
    handler.changeSelection = (e) => onChange(e.target.checked);
    return handler;
  },
};

InputRouter.propTypes = {
  schemaField: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  editorMode: PropTypes.bool,
};

function InputRouter({ schemaField, onChange, editorMode = false }) {
  const Component = inputComponents[schemaField.type];
  const handleChange = inputHandlers[schemaField.type]?.(onChange, schemaField);

  if (!Component) {
    console.warn(`Unsupported input type: ${schemaField.type}`);
    return null;
  }

  return (
    <Component
      schemaField={schemaField}
      onChange={handleChange}
      editorMode={editorMode}
    />
  );
}

export default InputRouter;
