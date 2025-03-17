import {Alert, Collapse, FormControlLabel, IconButton, Stack, Switch,} from "@mui/material";
import PropTypes from "prop-types";
import {fieldTypes} from "../../utils/formSchemas.js";
import DeleteIcon from "@mui/icons-material/Delete";
import InputRouter from "../pages/InputRouter.jsx";
import Title from '../input-fields/Title.jsx'
import Description from '../input-fields/Description.jsx'
import Tooltip from "@mui/material/Tooltip";
import {MenuItem} from '@mui/material';
import Dropdown from "../../../Generic/Dropdown.jsx"
import {motion } from "framer-motion";

FieldEditor.propTypes = {
    field: PropTypes.any,
    active: PropTypes.any,
    onActivate: PropTypes.func,
};

function FieldEditor({field, onActivate, active}) {

    const handleFieldClick = (e) => {
        e.stopPropagation()
        if (onActivate) {
            onActivate();
        }
    };

    return (

        <div  onClick={onActivate}
             className={` border rounded-lg 
             flex flex-col gap-3
              px-16 py-8
              w-full 
            transition-colors duration-100 ease-in-out 
            ${active ? "border-blue-400" : " hover:border-blue-200 "}`}

        >

            {/*Title and description*/}
            <motion.div  layoutId={`head-${field.id}`} className={`flex flex-col gap-3`}>
                <Title
                    onClick={onActivate}
                    error={!!field.errors?.title}
                    helperText={!!field.errors?.title}
                    value={field.title}
                    onChange={(e) => field.title = e.target.value}
                    placeholder="Question"
                    size="md"
                />
                <Description
                    onClick={onActivate}
                    error={!!field.errors?.description}
                    helperText={!!field.errors?.description}
                    value={field.description}
                    onChange={(e) => field.description = e.target.value}
                    placeholder="Description"
                    size="md"
                />
            </motion.div>

            {/*Actual input area of the field (a preview)*/}
            <div
                // layoutId={`body-${field.id}`}
                // layout="size"
            >
                <div  className="flex flex-col w-full gap-4   ">
                <Collapse className={`${field.errors?.input ? "":"hidden"}`} in={!!field.errors?.input}>
                    <Alert sx={{mb: 2}} severity="error">
                        {field.errors?.input}
                    </Alert>
                </Collapse>
                        <InputRouter
                            sx={{flexGrow: 1, width: 1}}
                            field={field}
                            editorMode={true}
                        />

                {/*Validation rules and options*/}
                {field.validationRules?.map((option, validationIndex) => (
                    <div
                        key={validationIndex}
                    >
                        <Tooltip
                            title={option.tooltip}
                            sx={{width: "fit-content"}}
                            placement="right"
                            delay={1000}
                        >
                            <FormControlLabel
                                value={option.id}
                                checked={Boolean(option.value)}
                                onChange={(e) => field.setValidationRule(validationIndex, e.target.checked)}
                                control={<Switch
                                />}
                                label={option.label}
                            />
                        </Tooltip>
                    </div>
                ))}
                </div>
            </div>
            {/*Global options, like if the field is required*/}
            <div>
                <div className="flex flex-row w-full justify-between"

                >
                    <Dropdown
                        onClick={onActivate}
                        label=" Type"
                        value={field.type}
                        onChange={(e) => field.setType(e.target.value)}
                        defaultValue="text"
                    >
                        {fieldTypes.map((option, index) => (
                            <MenuItem  key={index} value={option} sx={{borderColor: "#646cff"}}>
                                {option === "text" && " Text"}
                                {option === "radioGroup" && " Selection"}
                                {option === "checkboxGroup" && " Multiple Choice"}
                                {option === "boolean" && " Boolean"}
                            </MenuItem>
                        ))}
                    </Dropdown>
                    <div className="flex ">
                        <FormControlLabel
                            control={<Switch/>}
                            label=" Required"
                            onChange={(e) => field.isRequired = e.target.checked}
                        />
                        <IconButton onClick={() => field.delete()}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default FieldEditor;
