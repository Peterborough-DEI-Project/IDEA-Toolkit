import { inputBaseShape } from '/src/Components/features/form//form-consumer/form-consumer-utilities/propTypes.js';
import {TextInput} from "flowbite-react";

Text.propTypes = {
  ...inputBaseShape,
};

function Text({ onChange, validationRules }) {
  const multiline =
    validationRules?.length > 0 &&
    validationRules?.find((option) => option.id === "multiline").value;

  return (
      <TextInput
          className="bg-white"
          onChange={onChange}
          placeholder={"Input"}
          type="text"
      />
  );
}

export default Text;
