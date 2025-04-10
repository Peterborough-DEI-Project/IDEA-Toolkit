import React from "react";

import { useQuery } from "@tanstack/react-query";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserProfile } from "/src/Utils/API.js";
import {motion} from "framer-motion";
import {Button, Label, TextInput} from "flowbite-react";
import Btn from "../../../../../Components/core/Button/Btn.jsx";
import {supabase} from "/supabase.js"
import {useAlert} from "/src/Utils/AlertProvider.jsx";

function Profile() {
  const {showAlert} = useAlert();
  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserProfile(),
    queryKey: ["profileData"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let { error } = await supabase.schema("public").from("profiles").
      update({first_name: e.target.firstName.value, last_name: e.target.lastName.value, department: e.target.department.value}).eq("id", data.id);
      showAlert("Success", "Your profile has been updated successfully.");
    }catch (error) {
      console.log(error);
      showAlert("Error", "Your request couldn't be completed at this time. Please try again later.");
    }
  }

  if (isLoading) {
    return (
      <Backdrop open={isLoading} sx={{ zIndex: 9999 }}>
        <CircularProgress size={60} />
      </Backdrop>
    );
  }

  return <div className="min-h-screen bg-gray-50">

    <div className="container mx-auto px-4 py-24">
      <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
      >
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="firstName" value="First Name"/>
            <TextInput
                id="firstName"
                name="firstName"
                defaultValue={data?.first_name || ""}
                required
            />
          </div>

          <div>
            <Label htmlFor="lastName" value="Last Name"/>
            <TextInput
                id="lastName"
                name="lastName"
                defaultValue={data?.last_name || ""}
                required
            />
          </div>

          <div>
            <Label htmlFor="department" value="Department"/>
            <TextInput
                id="department"
                name="department"
                defaultValue={data?.department || ""}
                required
            />
          </div>


          <div>
            <Label htmlFor="created_at" value="Created At"/>
            <TextInput
                id="created_at"
                value={
                  data?.created_at
                      ? new Date(data.created_at).toLocaleString()
                      : "N/A"
                }
                disabled
            />
            <p className="text-sm text-gray-500 mt-1">
              Account creation date cannot be changed.
            </p>
          </div>
          <Button  type="submit"
                  className={`h-10 font-semibold text-lg appearance-none 
                    inline-flex justify-center items-center gap-3 px-4  rounded-lg
                    transition-colors duration-150 ease-in-out
                     active:ring-violet-500 active:ring-1
                    ${"o" === 'outline' ? 'border hover:border-violet-600 bg-none hover:text-violet-600 text-blue-600 border-blue-600 bg-white' : ' text-white  bg-gradient-to-br from-blue-600 to-violet-600 hover:from-blue-600 hover:text-white hover:to-violet-600 transition-[background-position] duration-[250ms] ease-out bg-[length:200%_200%] bg-[position:50%_50%] hover:bg-[position:100%_100%]'}
                `}>

            Save Changes
          </Button>

        </form>
      </motion.div>
    </div>
  </div>
}

export default Profile;
