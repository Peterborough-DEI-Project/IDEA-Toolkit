import { supabase } from "../../../../../../supabase.js";

async function getUserProfile() {
  let {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    let { data, error } = await supabase
      .schema("public")
      .from("profiles")
      .select("*");

    if (error) {
      console.log(error);
      return error;
    } else if (data) {
      return data;
    }
  }
}

export default getUserProfile;
