import PropTypes from "prop-types";
import CheckboxGroupEditor from "./CheckboxGroupEditor.jsx";
import RadioGroupEditor from "./RadioGroupEditor.jsx";
import AddInput from "./AddInput.jsx";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";

OptionsEditor.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  editorMode: PropTypes.bool,
};

function OptionsEditor({ field, editorMode = false }) {
  return (
    <motion.div layout={false}>
      {field.type === "checkboxGroup" && (
        <CheckboxGroupEditor
          options={field.options}
          onRemove={(option)=>field.removeOption(option)}
          editorMode={editorMode}
        />
      )}
      {field.type === "radioGroup" && (
        <RadioGroupEditor
          options={field.options}
          onRemove={(option)=>field.removeOption(option)}
          editorMode={editorMode}
        />
      )}
      <AnimatePresence mode="wait">
        <motion.div
            key={field.type} // Ensures animations only occur when the type changes
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ width: "100%" }}
        >
        {(editorMode === true ||
            field.validationRules?.find(
                (option) => option.id === "allowCustom",
            ) === true) && <AddInput onAdd={field.addOption} />}
        </motion.div>
      </AnimatePresence>

    </motion.div>
  );
}

export default OptionsEditor;
