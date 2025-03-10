import { TextField } from "@mui/material";
import PropTypes from "prop-types";

Description.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

function Description({ value, onChange, placeholder }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Description"}
      size="small"
      sx={{ border: "none", outline: 0 }}
    />
  );
}

export default Description;
