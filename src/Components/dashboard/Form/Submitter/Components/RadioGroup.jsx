import {
  FormControlLabel,
  Stack,
  RadioGroup as MuiRadioGroup,
  Radio,
} from "@mui/material";
import { inputBaseShape, selectionBaseShape } from "../propTypes.js";

RadioGroup.propTypes = {
  ...inputBaseShape,
  ...selectionBaseShape,
};

function RadioGroup({ options, onChange, value }) {
  return (
    <MuiRadioGroup value={value} onChange={onChange}>
      <pre>{JSON.stringify(options, null, 2)}</pre>
      <>
        {options.map((option, index) => (
          <Stack key={index} direction="row">
            <FormControlLabel
              key={index}
              value={option.id}
              control={<Radio />}
              label={option.value}
            />
          </Stack>
        ))}
      </>
    </MuiRadioGroup>
  );
}

export default RadioGroup;
