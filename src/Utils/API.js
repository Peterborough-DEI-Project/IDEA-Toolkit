import {supabase} from "../../supabase.js";
import CaseConverter from "./CaseConverter.js";
import {prepareAssessmentForUpdate} from "./queryHelpers.js";
import formatDate from "./formatDate.js";
import {v4 as uuidv4} from "uuid";


// Gets a user's profile
async function getUserProfile() {
    let {
        data: {user},
    } = await supabase.auth.getUser();

    if (user) {
        let {data, error} = await supabase
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

// Gets a full assessment in json form
async function getFullAssessment(assessmentId) {
    try {
        const { data } = await supabase
            .schema("assessments")
            .rpc("jsonb_get_full_assessment", {
                assessment_uuid: assessmentId,
            })
            .select("*");
        let { data: settings } = await supabase.schema("assessments").from("template_settings").select("*").eq("template_id", assessmentId);

        // If settings have not been configured
        if (!settings || Object.keys(settings).length === 0) {
            settings = (await getConfigurationSettings()).map((setting) => ({
                id: uuidv4(),
                settingId: setting.id,
                value: setting.defaultValue || ""
            }));
        }

        if (data) {
            return CaseConverter.fromJSON({...data, settings: settings}).toCamelCase();
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}


// Creates or updates an assessment
// Upserts metadata, fields, field options, and settings
async function upsertAssessment(data) {
    const dataToInsert = prepareAssessmentForUpdate(data);


    // Get id if it exists
    let {data: id} = await supabase.schema("assessments").from("templates").select("id").eq("id", dataToInsert.metadata.id).single();

    // If id exists, updates current assessment, otherwise creates a new record
    try {
        if (id) {
            await supabase.schema("assessments").rpc("update_assessment", {payload: dataToInsert});
        } else {
            await supabase.schema("assessments").from("templates").insert(dataToInsert.metadata);
            await supabase.schema("assessments").rpc("update_assessment", {payload: dataToInsert});
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Returns a list of assessment templates (for the table compnent)
async function getAssessmentsTemplates() {
    try {
        let {data} = await supabase
            .schema("assessments")
            .from("templates")
            .select("id, title, description, created_at, status")
            .eq("owner_id", "281d0e49-b3f3-44bb-8d37-6835a81ee1b8"); // todo: Fix

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

// Get the various configuration settings for an assessment
async function getConfigurationSettings() {
    try {
        const {data, error} = await supabase.schema("assessments").from("settings_config").select("*");
        if (data) {
            return data;
        } else {
            return await supabase.schema("assessments").from("settings_config").select("*");
        }
    } catch (error) {
        console.error("Error selecting data:", error);
        return null;
    }

}

// TODO: Implement supabase policies to make available assessments visible only (status == published)
async function getAvailableAssessments() {
    try {
        let {data} = await supabase.schema("assessments").from("templates_with_settings").select("*").eq("status", "published").lt("");
        return CaseConverter.fromJSON(data).toCamelCase();
    } catch (error) {
        console.error("Error selecting data:", error);
        return null;
    }
}

async function submitAssessment(templateId, data) {
    // Return an error if data is not provided
    if (!data) {
        return { success: false, error: "Data is required for submission." };
    }

    try {
        // Insert into submissions table and retrieve the submission ID
        const { data: submissionId, error: submissionError } = await supabase
            .schema("assessments")
            .from("submissions")
            .insert({ template_id: templateId })
            .select("id")
            .single();

        if (submissionError) {
            console.error("Error inserting submission:", submissionError.message);
            return { success: false, error: submissionError.message };
        }

        console.log("Submission ID inserted:", submissionId);

        // Insert into "submission_fields" table (example, assuming data contains the fields)
        const { error: fieldError } = await supabase
            .schema("assessments")
            .from("submission_fields")
            .insert(
                // Assume `data` contains necessary fields to match your schema
                data.map(field => ({
                    submission_id: submissionId.id, // Use the retrieved submission ID
                    field_id: field.fieldId,
                    value: field.value,
                }))
            );

        if (fieldError) {

            console.error("Error inserting submission fields:", fieldError.message);
            return { success: false, error: "Error with submission fields: " + fieldError.message };
        }

        // Return success after both inserts are complete
        return { success: true };
    } catch (error) {
        // Catch unexpected errors and return them in a standard format
        console.error("Unexpected error:", error.message);
        return { success: false, error: "Unexpected error: " + error.message };
    }
}


export {
    getUserProfile,
    getFullAssessment,
    upsertAssessment,
    getAssessmentsTemplates,
    getConfigurationSettings,
    getAvailableAssessments,
    submitAssessment
};
