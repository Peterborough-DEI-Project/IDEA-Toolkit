import { supabase } from "../../../../../../supabase.js";

async function getAssessmentData(assessmentId) {
  try {
    // Fetch assessment metadata
    const { data: assessment, error: assessmentError } = await supabase
      .schema("dei_admin")
      .from("assessments")
      .select("id, title, description, status")
      .eq("id", assessmentId)
      .single();

    if (assessmentError) throw assessmentError;
    if (!assessment) throw new Error("Assessment not found");

    // Fetch assessment fields
    const { data: fields, error: fieldsError } = await supabase
      .schema("dei_admin")
      .from("assessment_fields")
      .select(
        "id, title, description, validation:validation_rules , isRequired:required, type",
      )
      .eq("template_id", assessmentId);

    if (fieldsError) throw fieldsError;

    // Fetch selection options for the fields
    const fieldIds = fields.map((field) => field.id);
    const { data: selectionOptions, error: optionsError } = await supabase
      .schema("dei_admin")
      .from("assessment_selection_options")
      .select("id, label:value , fieldId:field_id")
      .in("field_id", fieldIds);

    if (optionsError) throw optionsError;

    // Organizing selection options under respective fields
    const fieldsWithOptions = fields.map((field) => ({
      ...field,
      options: selectionOptions.filter((option) => option.fieldId === field.id),
    }));
    return {
      ...assessment,
      fields: fieldsWithOptions,
    };
  } catch (error) {
    console.error("Error fetching assessment data:", error);
    return null;
  }
}

export { getAssessmentData };
