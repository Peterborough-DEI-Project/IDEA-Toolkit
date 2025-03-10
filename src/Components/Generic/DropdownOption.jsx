import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

DropdownOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};

function DropdownOption({ label, value }) {
  return <MenuItem value={value}>{label}</MenuItem>;
}

export default DropdownOption;
