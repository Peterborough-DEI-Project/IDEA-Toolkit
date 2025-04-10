import PropTypes from "prop-types";
import { useMemo } from "react";
import FieldRenderer from "../form-consumer-utilities/FieldRenderer.jsx";
import { Button } from "@mui/material";
import useFormConsumer from "../form-consumer-utilities/useFormConsumer.js";
import { createResponseSchema } from "../../form-builder/form-builder-utilities/schemaHelpers.js";

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
// TODO: Add logic for obeying settings
  return (

      <div className=" w-full p-16">
    <form onSubmit={(e)=>onSubmit(e, responseData)}>
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
        <button   type="submit"
                  disabled={!onSubmit}
                className={`h-10 font-semibold text-lg appearance-none 
                    inline-flex justify-center items-center gap-3 px-4  rounded-lg
                    transition-colors duration-150 ease-in-out
                    text-white
                    font-normal
                     active:ring-violet-500 active:ring-1
                    ${"out" === 'outline' ? 'border hover:border-violet-600 bg-none hover:text-violet-600 text-blue-600 border-blue-600 bg-white' : ' text-white  bg-gradient-to-br from-blue-600 to-violet-600 hover:from-blue-600 hover:text-white hover:to-violet-600 transition-[background-position] duration-[250ms] ease-out bg-[length:200%_200%] bg-[position:50%_50%] hover:bg-[position:100%_100%]'}
                `}>
          Submit
        </button>
      </div>
    </form>
      </div>
  );
}

export default FormSubmitter;
