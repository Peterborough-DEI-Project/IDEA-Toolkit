import { TextField } from "@mui/material";
import PropTypes from "prop-types";

Title.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

function Title({ value, onChange, placeholder, ...rest }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      fontSize={24}
      variant="standard"
      placeholder={placeholder || "Title"}
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "20px",
        },
        "& input::placeholder": {
          fontSize: "20px",
        },
      }}
      {...rest}
    />
  );
}

export default Title;
