import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

function Dropdown({ label, value, onChange, children, onClick }) {
  return (
    <>
      <FormControl sx={{ minWidth: 180 }} size="small" onClick={onClick}>
        <InputLabel>{label}</InputLabel>
        <Select
            onOpen={onClick}
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
