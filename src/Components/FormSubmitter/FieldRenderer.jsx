import { Body, Foot  } from "../FormBuilder/components/layouts/field-layout/index.js";
import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { formSchemaShape } from "./propTypes.js";
import FieldComponentRouter from "./FieldComponentRouter.jsx";

FieldRenderer.propTypes = {
  fieldSchema: formSchemaShape,
  responseField: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

function FieldRenderer({ fieldSchema, responseField, onChange }) {
  const description = fieldSchema.description ?? "";
  const title = fieldSchema.title ?? "Untitled Field";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography>{fieldSchema.isRequired ? "Required" : ""}</Typography>
        </Stack>
        <Typography variant="subtitle1">{description}</Typography>
      </div>
      <Body>
        <FieldComponentRouter
          type={fieldSchema.type}
          value={responseField.value}
          options={fieldSchema.options}
          validationRules={fieldSchema.validationRules ?? []}
          onChange={onChange}
        />
      </Body>
      <Foot></Foot>
    </div>
  );
}

export default FieldRenderer;
