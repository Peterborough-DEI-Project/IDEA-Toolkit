import PropTypes from "prop-types";
import { useMemo } from "react";
import FieldRenderer from "./FieldRenderer.jsx";
import { Stack, Typography, Button } from "@mui/material";
import useFormConsumer from "../Utils/useFormConsumer.js";
import { createResponseSchema } from "../Utils/schemaHelpers.js";
import { formSchemaShape } from "./propTypes.js";

FormSubmitter.propTypes = {
  formSchema: formSchemaShape,
  onSubmit: PropTypes.func,
};

function FormSubmitter({ formSchema, onSubmit }) {
  const responseSchemaMemo = useMemo(
    () => createResponseSchema(formSchema),
    [formSchema],
  );

  const { responseData, editResponse } = useFormConsumer(responseSchemaMemo);

  return (
    <form>
      {/*Uncomment this for debugging how the state is being changed by components*/}
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
      {/*<pre>{JSON.stringify(responseSchemaMemo, null, 2)}</pre>*/}
      <Stack direction="column" spacing={2}>
        <Typography variant="h3" component="div">
          {formSchema.title || "Untitled Form"}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {formSchema.description}
        </Typography>
        <>
          {responseData.map((field, index) => (
            <FieldRenderer
              key={index}
              fieldSchema={formSchema.fields[index]}
              responseField={field}
              onChange={(e) => editResponse(index, e)}
            />
          ))}
        </>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={!onSubmit}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export default FormSubmitter;
