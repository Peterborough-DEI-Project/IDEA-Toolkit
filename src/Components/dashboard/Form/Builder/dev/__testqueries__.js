import { supabase } from "../../../../../../supabase.js";
import formatDate from "../../../../../Utils/formatDate.js";

async function getAssessments() {}

async function testAPI({ title, description }) {
  let { data, error } = await supabase
    .schema("dei_admin")
    .from("assessments")
    .insert({
      title: "test title 2",
      description: "test descriptions 2",
      owner_id: "281d0e49-b3f3-44bb-8d37-6835a81ee1b8",
    })
    .select("id");

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Insert successful:", data);
  }
}

async function testDeleteAllRows() {
  const ownerId = "281d0e49-b3f3-44bb-8d37-6835a81ee1b8";

  try {
    let { data, error } = await supabase
      .schema("dei_admin")
      .from("assessments")
      .delete()
      .eq("owner_id", ownerId);

    if (error) {
      console.error("Error deleting all assessments:", error);
      return null; // Return null or handle error case
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

async function insertAssessmentData(payload, oldData = null) {
  const { assessmentMetaData, fields, selectionOptions } =
    formatInsertAssessment(payload);

  if (assessmentMetaData) {
    const { error } = await supabase
      .schema("assessments")
      .from("templates")
      .upsert(assessmentMetaData)
      .select();
    if (error) {
      return error;
    }
  }
  if (fields) {
    if (oldData && oldData.fields) {
      let oldFieldIdSet = fields.map((field) => field.id);
      let fieldsToRemove = oldData.fields.filter(
        (field) => !oldFieldIdSet.includes(field.id),
      ).id;
      let { error } = await supabase
        .schema("assessments")
        .from("template_fields")
        .delete()
        .in("id", fieldsToRemove);
      if (error) {
        console.error("Error inserting data:", error);
      }
    }
    const { error } = await supabase
      .schema("assessments")
      .from("template_fields")
      .upsert(fields);
    if (error) {
      return error;
    }
  }
  if (selectionOptions) {
    const { error } = await supabase
      .schema("assessments")
      .from("template_options")
      .upsert(selectionOptions)
      .select();
    if (error) {
      return error;
    }
  }
}

async function getAssessmentsTemplates() {
  try {
    let { data, error } = await supabase
      .schema("assessments")
      .from("templates")
      .select("id, title, description, created_at, status")
      .eq("owner_id", "281d0e49-b3f3-44bb-8d37-6835a81ee1b8");

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      created: formatDate(item.created_at),
      status: item.status[0].toUpperCase() + item.status.slice(1),
    }));
  } catch (error) {
    console.error("Error selecting data:", error);
    return null;
  }
}

export async function getPublishedAssessments() {
  try {
    let { data, error } = await supabase
      .schema("assessments")
      .from("templates")
      .select("id, title, description, created_at, status")
      .eq("status", "published");

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      created: formatDate(item.created_at),
      status: item.status[0].toUpperCase() + item.status.slice(1),
    }));
  } catch (error) {
    console.error("Error selecting data:", error);
    return null;
  }
}

export async function getAssessmentSubmissions() {
  try {
    let { data, error } = await supabase
      .schema("assessments")
      .from("submissions")
      .select("*");
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      created: formatDate(item.created_at),
      status: item.status[0].toUpperCase() + item.status.slice(1),
    }));
  } catch (error) {
    console.error("Error selecting data:", error);
    return null;
  }
}

async function __deleteAssessment(assessmentId) {
  try {
    let { data, error } = await supabase
      .schema("dei_admin")
      .from("assessments")
      .delete()
      .eq("id", assessmentId);
    return data;
  } catch (error) {
    console.error(error);
    return null;
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
function formatInsertAssessment(data) {
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

const data = [
  {
    id: 1,
    title: "Test Assessments",
    description: "Test description",
    status: "Draft",
    responses: 6,
    published: "Dec 12 2024",
  },
  {
    id: 2,
    title: "Test Assessments 2",
    description: "Test description 2",
    status: "Draft",
    responses: 6,
    published: "Dec 12 1904",
  },
];

export {
  testAPI,
  insertAssessmentData,
  getAssessmentsTemplates,
  testDeleteAllRows,
  getAssessmentData,
  __deleteAssessment,
  formatInsertAssessment,
};
