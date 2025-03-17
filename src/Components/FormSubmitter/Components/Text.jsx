import { TextField } from "@mui/material";
import { inputBaseShape } from "../propTypes.js";

Text.propTypes = {
  ...inputBaseShape,
};

function Text({ onChange, validationRules }) {
  const multiline =
    validationRules?.length > 0 &&
    validationRules?.find((option) => option.id === "multiline").value;

  return (
    <TextField
      fullWidth
      multiline={multiline || false}
      onChange={onChange}
      id="outlined-basic"
      label={"Input"}
      variant="outlined"
    />
  );
}

export default Text;
