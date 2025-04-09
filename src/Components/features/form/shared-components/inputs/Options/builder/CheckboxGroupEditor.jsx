import {FormControlLabel,} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import DeleteButton from '../../../../../../core/Button/DeleteButton.jsx'
import { motion} from "framer-motion";

CheckboxGroupEditor.propTypes = {
    options: PropTypes.array,
    schemaField: PropTypes.object,
    onRemove: PropTypes.func,
    editorMode: PropTypes.bool,
};

function CheckboxGroupEditor({options, onRemove, editorMode = false}) {
    return (
        <motion.div layout={false} className="flex flex-col h-fit gap-1">

            {options.map((option, index) => (
                <div
                    key={`option-${option.value}`}
                    className="flex flex-row gap-1">
                    {editorMode === true && (
                        <DeleteButton onClick={() => onRemove(option)}/>
                    )}
                    <FormControlLabel
                        key={index}
                        value={option}
                        control={<Checkbox disabled={editorMode}/>}
                        label={option.value}
                    />
                </div>
                    ))}

                </motion.div>
                );
            }

export default CheckboxGroupEditor;
