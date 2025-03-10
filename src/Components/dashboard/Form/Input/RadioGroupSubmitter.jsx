import React from "react";
import { FormControlLabel, Stack, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import PropTypes from "prop-types";

RadioGroupSubmitter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

function RadioGroupSubmitter({ options, onChange, value }) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <>
        {options.map((option, index) => (
          <Stack key={index} direction="row">
            <FormControlLabel
              key={index}
              value={option.id}
              control={<Radio />}
              label={option.label}
            />
          </Stack>
        ))}
      </>
    </RadioGroup>
  );
}

export default RadioGroupSubmitter;
