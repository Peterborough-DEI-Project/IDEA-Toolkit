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
            settings = (await getConfigurationSettings()).map((setting)=> ({id: uuidv4(), settingId: setting.id, value: setting.defaultValue || ""}));
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
        let { data  } = await supabase
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

// Get the various configuration settings for an assessment
async function getConfigurationSettings(){
    try{
        const {data, error} = await supabase.schema("assessments").from("settings_config").select("*");
        if(data){
            return data;
        }else{
            return await supabase.schema("assessments").from("settings_config").select("*");
        }
    }catch(error){
        console.error("Error selecting data:", error);
        return null;
    }

}

export {getUserProfile, getFullAssessment, upsertAssessment, getAssessmentsTemplates, getConfigurationSettings};
