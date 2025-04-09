import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

CheckboxWithLabel.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

function CheckboxWithLabel({ onChange }) {
  return (
    <FormControlLabel control={<Checkbox />} label="test" onClick={onChange} />
  );
}

export default Checkbox;
