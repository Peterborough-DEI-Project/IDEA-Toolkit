import { useState } from "react";

const useFormConsumer = (responseSchema) => {
  const [responseData, setResponseData] = useState(responseSchema);

  const editResponse = (index, e) => {
    let newValue = responseData[index].value;
    switch (responseData[index].type) {
      case "text":
        newValue = e.target.value;
        break;
      case "radioGroup":
        newValue = e.target.value;

        break;
      case "checkboxGroup":
        e.target.checked === true
          ? newValue.push(e.target.value)
          : (newValue = newValue.filter((option) => option !== e.target.value));
        break;
      case "boolean":
        newValue = e.target.checked;
        break;
    }

    setResponseData((prevData) =>
      prevData.map((field, i) =>
        i === index ? { ...field, value: newValue } : field,
      ),
    );
  };
  return { responseData, editResponse };
};

export default useFormConsumer;
