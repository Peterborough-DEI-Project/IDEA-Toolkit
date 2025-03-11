import {
  Alert,
  Collapse,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  modifyTitle,
  modifyDescription,
  changeType,
  modifyIsRequired,
} from "../Utils/fieldHelpers.js";
import { fieldTypes } from "../Utils/formSchemas.js";
import { Root, Head, Foot, Body } from "./FieldLayout/index.js";
import Dropdown from "../../../Generic/Dropdown.jsx";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import InputRouter from "./InputRouter.jsx";

import Tooltip from "@mui/material/Tooltip";

FieldEditor.propTypes = {
  field: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(fieldTypes),
    options: PropTypes.array,
    isRequired: PropTypes.bool.isRequired,
    validation: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        tooltip: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  errors: PropTypes.object,
  resetError: PropTypes.func,
};

function FieldEditor({
  field,
  onChange,
  index,
  onDelete,
  errors,
                       resetError,
}) {
  const editTitle = (e) => {
    onChange(index, modifyTitle(field, e.target.value));
    resetError(index, "title");
  };
  const editDescription = (e) => {
    onChange(index, modifyDescription(field, e.target.value));
    resetError(index, "description");
  };

  const handleChangeType = (e) => {
    onChange(index, changeType(field, e.target.value));
    resetError(index, "input");
  };
  const handleChangeIsRequired = (e) => {
    onChange(index, modifyIsRequired(field, e.target.checked));
  };

  const handleChangeInput = (newFieldValue) => {
    onChange(index, newFieldValue);
    resetError(index, "input");
  };

  const handleUpdateValidation = (e, validationIndex) => {
    const test2 = field.validation.map((x, index) => {
      if (index === validationIndex) {
        return { ...x, value: e.target.checked };
      }
      return x;
    });
    let test = {
      ...field,
      validation: [...test2],
    };

    onChange(index, test);
  };

  return (
    <>
      <Root>
        {/*Title and description*/}
        <Head>
          <TextField
            error={!!errors[index]?.title}
            helperText={errors[index]?.title}
            value={field.title}
            onChange={editTitle}
            placeholder="Question"
            variant="standard"
          />
          <TextField
            error={!!errors[index]?.description}
            helperText={errors[index]?.description}
            value={field.description}
            onChange={editDescription}
            placeholder="Description"
            size="sm"
          />
        </Head>

        {/*Actual input area of the field (a preview)*/}
        <Body>
          <Collapse in={!!errors[index]?.input}>
            <Alert sx={{ mb: 2 }} severity="error">
              {errors[index]?.input}
            </Alert>
          </Collapse>
          <InputRouter
            sx={{ flexGrow: 1, width: 1 }}
            schemaField={field}
            onChange={handleChangeInput}
            editorMode={true}
          />

          {/*Validation rules and options*/}
          {field.validation?.map((option, validationIndex) => (
            <Stack
              direction="row"
              key={validationIndex}
              sx={{ alignContent: "center" }}
            >
              <Tooltip
                title={option.tooltip}
                sx={{ width: "fit-content" }}
                placement="right"
                delay={1000}
              >
                <FormControlLabel
                  value={option.id}
                  checked={Boolean(option.value)}
                  onChange={(e) => handleUpdateValidation(e, validationIndex)}
                  control={<Switch />}
                  label={option.label}
                />
              </Tooltip>
            </Stack>
          ))}
        </Body>
        {/*Global options, like if the field is required*/}
        <Foot>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              width: 1,
            }}
          >
            <Dropdown
              label="Type"
              value={field.type}
              onChange={(e) => handleChangeType(e)}
            >
              {fieldTypes.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Dropdown>
            <Stack direction="row">
              <FormControlLabel
                control={<Switch />}
                label="Required"
                onChange={handleChangeIsRequired}
              />
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Foot>
      </Root>
    </>
  );
}

export default FieldEditor;
