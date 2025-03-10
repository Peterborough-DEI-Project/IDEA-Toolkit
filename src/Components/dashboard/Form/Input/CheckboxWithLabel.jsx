import React from "react";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

CheckboxWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function CheckboxWithLabel({ label, onChange }) {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label="test"
      onClick={(e) => onChange(e.target.checked)}
    />
  );
}

export default Checkbox;
