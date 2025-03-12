import { TextField } from "@mui/material";
import PropTypes from "prop-types";

Text.propTypes = {
  schemaField: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  editorMode: PropTypes.bool,
};

function Text({ schemaField, onChange, editorMode = false }) {
  const multiline = schemaField.validationRules?.find(
    (option) => option.id === "multiline",
  ).value;
  return (
    <TextField
      fullWidth
      multiline={multiline || false}
      onChange={onChange}
      disabled={editorMode}
      id="outlined-basic"
      label={"Input"}
      variant="outlined"
      className={`${editorMode === true && "bg-gray-50"} `}
    />
  );
}

export default Text;
