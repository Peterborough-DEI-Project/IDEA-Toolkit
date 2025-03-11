import { Stack } from "@mui/material";
import FieldEditor from "./FieldEditor.jsx";
import AddField from "./Actions/AddField.jsx";
import { Title, Description } from "../Input/index.js";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";

FormEditor.propTypes = {
  formSchema: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  editField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired,
};

function FormEditor({
  formSchema,
  addField,
  editField,
  removeField,
  handleFormChange,
  errors,
  resetError,
}) {
  return (
    <>
      <Stack direction="column" spacing={2}>
        <Title
          error={!!errors?.title}
          required
          helperText={errors?.title}
          value={formSchema.title}
          onChange={(e) => handleFormChange("title", e.target.value)}
          placeholder="Untitled Form"
        />
        <Description
          value={formSchema.description}
          onChange={(e) => handleFormChange("description", e.target.value)}
          placeholder="Form Description"
          multiline
          rows={3}
        />
        {Object.entries(formSchema.fields).map(([fieldId, field]) => (
          <FieldEditor
            key={fieldId}
            field={field}
            onChange={editField}
            index={fieldId}
            onDelete={() => removeField(fieldId)}
            errors={errors}
            resetError={resetError}
          />
        ))}

        <AddField onClick={() => addField("text")} />
      </Stack>
    </>
  );
}

export default FormEditor;
