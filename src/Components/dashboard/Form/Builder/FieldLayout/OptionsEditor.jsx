import PropTypes from "prop-types";
import CheckboxGroupEditor from "../../Input/CheckboxGroupEditor.jsx";
import RadioGroupEditor from "../../Input/RadioGroupEditor.jsx";
import AddInput from "../Actions/AddInput.jsx";

OptionsEditor.propTypes = {
  schemaField: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  editorMode: PropTypes.bool,
};

function OptionsEditor({ schemaField, onChange, editorMode = false }) {
  return (
    <>
      {schemaField.type === "checkboxGroup" && (
        <CheckboxGroupEditor
          options={schemaField.options}
          onRemove={onChange.remove}
          editorMode={editorMode}
        />
      )}
      {schemaField.type === "radioGroup" && (
        <RadioGroupEditor
          options={schemaField.options}
          onRemove={onChange.remove}
          editorMode={editorMode}
        />
      )}
      {(editorMode === true ||
        schemaField.validationRules?.find(
          (option) => option.id === "allowCustom",
        ) === true) && <AddInput onAdd={onChange.add} />}
    </>
  );
}

export default OptionsEditor;
