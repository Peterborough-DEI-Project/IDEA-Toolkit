import { FormControlLabel, RadioGroup, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import PropTypes from "prop-types";
import DeleteButton from '../../../Generic/DeleteButton.jsx'
import {motion} from 'framer-motion';

RadioGroupEditor.propTypes = {
  options: PropTypes.array,
  onRemove: PropTypes.func,
  editorMode: PropTypes.bool,
  field: PropTypes.object,
};

function RadioGroupEditor({ options, onRemove, editorMode = false }) {
  return (
      <motion.div layout={false} className="flex flex-col h-fit gap-1">

              {options.map((option, index) => (
                  <div className="flex flex-row gap-1">
                      {editorMode === true && (
                          <DeleteButton onClick={() => onRemove(option)}/>
                      )}
                      <FormControlLabel
                          value={option}
                          control={<Radio disabled={editorMode}/>}
                          label={option.value}
                      />
                  </div>
              ))}

      </motion.div>
  );
}

export default RadioGroupEditor;
