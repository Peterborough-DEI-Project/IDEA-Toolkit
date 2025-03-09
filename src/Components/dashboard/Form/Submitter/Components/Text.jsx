import { TextField } from "@mui/material";
import { inputBaseShape } from "../propTypes.js";

Text.propTypes = {
  ...inputBaseShape,
};

function Text({ onChange, validation }) {
  const multiline =
    validation.length > 0 &&
    validation?.find((option) => option.id === "multiline").value;

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
