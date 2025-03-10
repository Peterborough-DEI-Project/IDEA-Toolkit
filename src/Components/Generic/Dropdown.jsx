import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  children: PropTypes.node,
};

function Dropdown({ label, value, onChange, children }) {
  return (
    <>
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          value={value}
          onChange={onChange}
          variant="standard"
        >
          {children}
        </Select>
      </FormControl>
    </>
  );
}

export default Dropdown;
