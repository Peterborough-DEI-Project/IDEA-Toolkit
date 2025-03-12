import { FormControlLabel, RadioGroup, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import PropTypes from "prop-types";
import { DeleteButton } from "./index.js";

RadioGroupEditor.propTypes = {
  options: PropTypes.array,
  onRemove: PropTypes.func,
  editorMode: PropTypes.bool,
  field: PropTypes.object,
};

function RadioGroupEditor({ options, onRemove, editorMode = false }) {
  return (
    <RadioGroup>
      <>
        {options.map((option, index) => (
          <Stack key={index} direction="row">
            {editorMode === true && (
              <DeleteButton onClick={() => onRemove(option)} />
            )}
            <FormControlLabel
              value={option}
              control={<Radio disabled={editorMode} />}
              label={option.value}
            />
          </Stack>
        ))}
      </>
    </RadioGroup>
  );
}

export default RadioGroupEditor;
