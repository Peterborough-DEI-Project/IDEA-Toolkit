import { Body, Foot, Head, Root } from "../Builder/FieldLayout/index.js";
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
    <Root>
      <Head>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography>{fieldSchema.isRequired ? "Required" : ""}</Typography>
        </Stack>
        <Typography>{description}</Typography>
      </Head>
      <Body>
        <FieldComponentRouter
          type={fieldSchema.type}
          value={responseField.value}
          options={fieldSchema.options}
          validation={fieldSchema.validation ?? []}
          onChange={onChange}
        />
      </Body>
      <Foot></Foot>
    </Root>
  );
}

export default FieldRenderer;
