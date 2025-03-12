import {useCallback, useEffect, useState} from "react";
import {Box, Container, Backdrop, CircularProgress} from "@mui/material";
import {useAlert} from "../../../../Utils/AlertProvider.jsx"
import FormDashboardRouter from "./FormDashboardRouter.jsx";
import useFormBuilder from "../Utils/useFormBuilder.js";
import {getFullAssessment} from "/src/Utils/API.js";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {redirect} from "react-router";
import Sidebar from "./Sidebar.jsx";
import {upsertAssessment} from "../../../../Utils/API.js";

function FormDashboard() {
    const {id} = useParams();                               // Checks the url for a form Id; fetches the relevant form
    const [activeView, setActiveView] = useState(0);        // Used for navigating between form dashboard views
    const [shouldQuery, setShouldQuery] = useState(true);   // Temporary solution to prevent useQuery from fetching again Todo: Fix this
    const [loading, setLoading] = useState(null);
    const {showAlert} = useAlert();
    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const {
        formSchema,
        addField,
        editField,
        removeField,
        handleFormChange,
        errors,
        resetError,
        validateSchema,
        setFormSchema,
    } = useFormBuilder();

    const {data, error, isLoading,} = useQuery({
        queryFn: () => getFullAssessment(id),
        queryKey: ["assessment", id],
        enabled: (Boolean(id) === true && shouldQuery === true),
    });

    useEffect(() => {
        if (data) {
            setFormSchema(data);
            setShouldQuery(false)
        }
    }, [data, setFormSchema]);

    const handleSaveOrPublish = useCallback(
        // Wait for user response (continue or cancel)
        async (status) => {
            const userConfirmed = await new Promise((resolve) => {
                showAlert(
                    status === "published" ? "Publish Changes" : "Save Changes",
                    status === "published"
                        ? "Changes will be published and visible to employees."
                        : "Changes will be saved and only visible by you.",
                    () => resolve(true), // Continue
                    () => resolve(false) // Close
                );
            });

            // If continues, validates the form and then inserts into database
            if (userConfirmed) {
                const hasErrors = validateSchema();
                if (!hasErrors) {
                    setLoading(true);
                    const error = await upsertAssessment({
                        ...formSchema,
                        status: status
                    });
                    setLoading(false);

                    // Alerts based on result of query
                    if (error) {
                        showAlert("Error", `We weren't able to complete your request. Please try again.\nMessage: ${error.message}`);
                    } else {
                        showAlert("Success", `Your changes have been ${status === "published" ? "published" : "saved"} successfully.`, () => {
                            redirect("/dashboard/assessments");
                        });
                    }
                } else {
                    showAlert("Action Needed", "Please ensure that all highlighted fields are completed.");
                }
            }
        },
        [errors, formSchema, showAlert, validateSchema]
    );

    if (isLoading || loading) {
        return (
            <Backdrop open={loading} sx={{zIndex: 9999}}>
                <CircularProgress size={60}/>
            </Backdrop>
        );
    }
    return (
        <>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Container maxWidth="md">
                    <FormDashboardRouter
                        activeViewId={activeView}
                        formSchema={formSchema}
                        addField={addField}
                        editField={editField}
                        removeField={removeField}
                        handleFormChange={handleFormChange}
                        errors={errors}
                        resetError={resetError}
                    />
                </Container>
                <Sidebar
                    activeView={activeView}
                    onNavigate={handleViewChange}
                    onSave={() => handleSaveOrPublish("draft")}
                    onPublish={() => handleSaveOrPublish("published")}
                />
            </Box>
        </>
    );
}

export default FormDashboard;
