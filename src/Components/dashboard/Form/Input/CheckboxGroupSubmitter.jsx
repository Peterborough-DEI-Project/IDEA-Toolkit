import React from "react";
import { FormControlLabel, Stack, FormGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import Text from "./Text.jsx";
import RadioGroupSubmitter from "./RadioGroupSubmitter.jsx";

CheckboxGroupSubmitter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

function CheckboxGroupSubmitter({ options, onChange, value }) {
  return (
    <FormGroup value={value} onChange={onChange}>
      <>
        {options.map((option, index) => (
          <Stack key={index} direction="row">
            <FormControlLabel
              key={index}
              value={option.id}
              control={<Checkbox />}
              label={option.label}
            />
          </Stack>
        ))}
      </>
    </FormGroup>
  );
}

export default CheckboxGroupSubmitter;
