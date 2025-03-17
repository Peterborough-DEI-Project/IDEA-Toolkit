import OptionsEditor from "../editors/OptionsEditor.jsx";
import SwitchWithLabel from "../input-fields/SwitchWithLabel.jsx";
import PropTypes from "prop-types";
import Text from "../input-fields/Text.jsx";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";

const inputComponents = {
  text: Text,
  radioGroup: OptionsEditor,
  checkboxGroup: OptionsEditor,
  boolean: SwitchWithLabel,
};

InputRouter.propTypes = {
  field: PropTypes.any,
  onChange: PropTypes.func,
  editorMode: PropTypes.bool,
};

const inputHandlers = {
  text: (onChange, field) => (e) => onChange(e.target.value),
  radioGroup: (onChange, field) => {
    const handler = () => {};
    handler.add = (value) => field.addOption(value);
    handler.remove = (value) => field.removeOption(value);
    handler.changeSelection = (value) => onChange(value);
    return handler;
  },
  checkboxGroup: (onChange, field) => {
    const handler = () => {};
    handler.add = (value) => field.addOption(value) ;
    handler.remove = (value) => field.removeOption(value);
    handler.changeSelection = (e) => onChange(e.target.checked);
    return handler;
  },
};

function InputRouter({ field, onChange, editorMode = false }) {
  const Component = inputComponents[field.type];
  const handleChange = inputHandlers[field.type]?.(onChange, field);

  if (!Component) {
    console.warn(`Unsupported input type: ${field.type}`);
    return null;
  }

  return (

            <Component
                field={field}
                onChange={handleChange}
                editorMode={editorMode}
            />


  );
}

export default InputRouter;
