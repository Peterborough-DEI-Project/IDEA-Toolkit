import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getFullAssessment, submitAssessment} from "../../../../../../Utils/API.js";
import FormSubmitter from "../../../../../FormSubmitter/FormSubmitter.jsx";
import {useQuery} from "@tanstack/react-query";
import {Backdrop, CircularProgress} from "@mui/material";
import {useAlert} from "../../../../../../Utils/AlertProvider.jsx";

function SubmitAssessment() {
    const {id} = useParams();
    const {showAlert} = useAlert();
    const [shouldQuery, setShouldQuery] = useState(true);
    const [formData, setFormData] = useState(null);// Temporary solution to prevent useQuery from fetching again Todo: Fix this

    const {data, error, isLoading,} = useQuery({
        queryFn: () => getFullAssessment(id),
        queryKey: ["assessment", id],
        enabled: (Boolean(id) === true && shouldQuery === true),
    });

    useEffect(() => {
        if (data) {
            setFormData({schema: data});
            setShouldQuery(false)
        }
    }, [data]);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
            const userConfirmed = await new Promise((resolve) => {
                showAlert("Submit Assessment", "Are you sure you want to submit this assessment?",
                    () => resolve(false), // Close
                    () => resolve(true) // Continue
                );
            });

            if(userConfirmed){
                let response =  await submitAssessment(id, data);

                if(response.success === false){
                    showAlert("Error", `There was an error submitting your response. Please try again or contact support if the issue persists. \n\nHint: ${response.error}`);
                }else{
                    showAlert("Success", "Your response has been submitted successfully.");
                }
                // showAlert("test", response)
                // showAlert("Success", "Your response has been submitted successfully.");
            }
    }

    if (isLoading) {
        return (
            <Backdrop open={true} sx={{zIndex: 9999}}>
                <CircularProgress size={60}/>
            </Backdrop>
        )
    }
    if (formData !== null) {
        return (
            <div className="flex min-w-full h-full  ">
                <div className="w-full h-[calc(100vh-64px)] overflow-y-auto light-scrollbar ">
                    <FormSubmitter form={formData} onSubmit={handleSubmit}/>
                </div>
            </div>

        );

    }
        // todo: replace with fallback
        return null;

    }

    export default SubmitAssessment;