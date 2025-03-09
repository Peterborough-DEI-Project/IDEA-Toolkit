import { supabase } from "../../supabase.js";
import { formatInsertAssessment } from "./queryHelpers.js";

async function getUserProfile() {
  let {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    let { data, error } = await supabase
      .schema("public")
      .from("profiles")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (error) {
      console.log(error);
      return error;
    } else if (data) {
      return data;
    }
  }
}

async function getFullAssessment(assessmentId) {
  try {
    const { data, error } = await supabase
      .schema("assessments")
      .rpc("jsonb_get_full_assessment", {
        assessment_uuid: assessmentId,
      })
      .select("*");
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

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

async function insertAssessmentData(data) {
  const { assessmentMetaData, fields, selectionOptions } =
    formatInsertAssessment(data);

  if (assessmentMetaData) {
    supabase.schema("dei_admin").from("assessments").insert(assessmentMetaData);
  }

  if (fields) {
    supabase.schema("dei_admin").from("assessment_fields").upsert(fields);
  }

  if (selectionOptions) {
    supabase
      .schema("dei_admin")
      .from("assessment_selection_options")
      .insert(selectionOptions);
  }
}

async function getUserAssessment() {}

export { getUserProfile, getAssessmentData, getFullAssessment };
