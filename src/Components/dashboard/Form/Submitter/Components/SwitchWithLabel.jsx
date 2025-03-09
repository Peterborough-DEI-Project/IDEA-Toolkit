import { FormControlLabel, Switch } from "@mui/material";
import { inputBaseShape } from "../propTypes.js";
import PropTypes from "prop-types";

SwitchWithLabel.propTypes = {
  ...inputBaseShape,
  label: PropTypes.string,
};
//
function SwitchWithLabel({ onChange, label = "" }) {
  return (
    <FormControlLabel control={<Switch />} label={label} onChange={onChange} />
  );
}

export default SwitchWithLabel;
