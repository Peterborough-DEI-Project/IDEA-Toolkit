import { FormControlLabel, Stack, FormGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

CheckboxGroupSubmitter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string.isRequired,
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
              label={option.value}
            />
          </Stack>
        ))}
      </>
    </FormGroup>
  );
}

export default CheckboxGroupSubmitter;
