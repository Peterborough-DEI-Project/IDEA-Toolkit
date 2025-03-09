import { useEffect, useState } from "react";
import { schema, defaultFieldSchemas } from "./formSchemas.js";
import { v4 as uuidv4 } from "uuid";
import { validateSchema as validationHelper } from "./schemaHelpers.js";
import { useQuery } from "@tanstack/react-query";
import { getAssessmentData } from "../Builder/dev/__testqueries__.js";

let newId = 0;

const useFormSchema = (data = null) => {
  const [formSchema, setFormSchema] = useState(
    data || {
      id: uuidv4(),
      title: "",
      description: "",
      isRequired: false,
      fields: [],
    },
  );
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const addField = (type) => {
    if (type) {
      const newField = {
        ...defaultFieldSchemas[type],
        id: uuidv4(),
      };

      const test = {
        ...formSchema,
        fields: [...formSchema.fields, { ...newField }],
      };

      setFormSchema(test);
      newId++;
    }
  };

  const editField = (fieldId, updatedProperties) => {
    if (
      typeof formSchema.fields[fieldId] === "undefined" ||
      typeof updatedProperties === "undefined"
    ) {
      return;
    }

    const newFields = [...formSchema.fields];
    newFields[fieldId] = updatedProperties;

    setFormSchema({ ...formSchema, fields: newFields });
  };

  const removeField = (fieldId) => {
    if (typeof formSchema.fields[fieldId] === "undefined") {
      throw new Error("Error updating field state");
    }

    const updatedFields = formSchema.fields.filter(
      (_, index) => index !== Number(fieldId),
    );
    setFormSchema({
      ...formSchema,
      fields: updatedFields,
    });
  };

  const handleFormChange = (key, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: "",
    }));

    setFormSchema((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const devClearAll = () => {
    setFormSchema(schema);
    newId = 0;
  };

  const removeError = (index, key) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: {
        ...prevErrors[index],
        [key]: "",
      },
    }));
  };

  const onSave = () => {
    const hasErrors = validateSchema(formSchema);
    if (Object.entries(hasErrors)?.length > 0) {
      setErrors(hasErrors);
      return !hasErrors;
    }
  };

  const onPublish = () => {
    const hasErrors = validateSchema();
    return !hasErrors;
  };

  const validateSchema = () => {
    const errors = validationHelper(formSchema);

    if (Object.entries(errors)?.length > 0) {
      setErrors(errors);
      return false;
    }

    return true;
  };

  return {
    formSchema,
    setFormSchema,
    addField,
    editField,
    removeField,
    devClearAll,
    handleFormChange,
    errors,
    removeError,
    loading,
    onSave,
    onPublish,
    validateSchema,
    setLoading,
  };
};

export default useFormSchema;
