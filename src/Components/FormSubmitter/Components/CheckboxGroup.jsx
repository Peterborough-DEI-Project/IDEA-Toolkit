import { FormControlLabel, Stack, FormGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { inputBaseShape, selectionBaseShape } from "../propTypes.js";

CheckboxGroup.propTypes = {
  ...selectionBaseShape,
  ...inputBaseShape,
};

function CheckboxGroup({ options, onChange, value }) {
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

export default CheckboxGroup;
