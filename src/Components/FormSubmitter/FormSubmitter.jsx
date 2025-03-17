import PropTypes from "prop-types";
import { useMemo } from "react";
import FieldRenderer from "./FieldRenderer.jsx";
import { Button } from "@mui/material";
import useFormConsumer from "./useFormConsumer.js";
import { createResponseSchema } from "../FormBuilder/utils/schemaHelpers.js";

FormSubmitter.propTypes = {
  form: PropTypes.any,
  onSubmit: PropTypes.func,
};

function FormSubmitter({ form, onSubmit }) {
  const formSchema = form.schema;
  const responseSchemaMemo = useMemo(
    () => createResponseSchema(formSchema),
    [formSchema],
  );

  const { responseData, editResponse } = useFormConsumer(responseSchemaMemo);

  return (
      <div className=" w-full p-16">
    <form>
      <div className="flex flex-col gap-8">
        <div className="border-b">
          <h5 className="text-5xl text-gray-700 font-semibold mb-4">
            {formSchema.title || "Untitled Form"}
          </h5>
          <p className="text-gray-600 text-xl font-semibold mb-6">
            {formSchema.description}
          </p>
        </div>
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
      </div>
    </form>
      </div>
  );
}

export default FormSubmitter;
