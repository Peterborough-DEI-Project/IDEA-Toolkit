import { FormControlLabel, Switch } from "@mui/material";
import PropTypes from "prop-types";

SwitchWithLabel.propTypes = {
  value: PropTypes.any,
  label: PropTypes.any,
  onChange: PropTypes.func,
  editorMode: PropTypes.bool,
};

function SwitchWithLabel({ value, label, onChange }) {
  return (
    <FormControlLabel
      value={value}
      control={<Switch />}
      label={label || "Question"}
      onChange={onChange}
    />
  );
}

export default SwitchWithLabel;
