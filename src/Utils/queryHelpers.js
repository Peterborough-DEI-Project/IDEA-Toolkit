async function formatInsertAssessment(data) {
  const assessmentMetaData = {
    id: data.id,
    title: data.title,
    description: data.description,
  };

  const fields = data.fields.map((field, index) => ({
    template_id: data.id,
    id: field.id,
    title: field.title,
    description: field.description,
    required: field.isRequired,
    sequence_order: index,
    type: field.type,
    validation_rules: field.validation,
  }));
  const selectionOptions = [];
  Object.values(
    data.fields.filter(
      (field) => field.options && Array.isArray(field.options),
    ),
  ).forEach((field) => {
    field.options.forEach((option, index) => {
      selectionOptions.push({
        field_id: field.id,
        id: option.id,
        value: option.label,
        sequence_order: index,
      });
    });
  });

  return { assessmentMetaData, fields, selectionOptions };
}

export { formatInsertAssessment };
