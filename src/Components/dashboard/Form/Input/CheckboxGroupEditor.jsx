import { FormControlLabel, FormGroup, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import { DeleteButton } from "./index.js";

CheckboxGroupEditor.propTypes = {
  options: PropTypes.array,
  schemaField: PropTypes.object,
  onRemove: PropTypes.func,
  editorMode: PropTypes.bool,
};

function CheckboxGroupEditor({ options, onRemove, editorMode = false }) {
  return (
    <FormGroup>
      <>
        {options.map((option, index) => (
          <Stack key={index} direction="row">
            {editorMode === true && (
              <DeleteButton onClick={() => onRemove(option)} />
            )}

            <FormControlLabel
              key={index}
              value={option}
              control={<Checkbox disabled={editorMode} />}
              label={option.label}
            />
          </Stack>
        ))}
      </>
    </FormGroup>
  );
}

export default CheckboxGroupEditor;
