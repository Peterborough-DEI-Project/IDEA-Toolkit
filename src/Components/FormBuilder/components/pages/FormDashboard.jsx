import {useCallback, useEffect, useState} from "react";
import { Backdrop, CircularProgress,} from "@mui/material";
import {useAlert} from "../../../../Utils/AlertProvider.jsx"
import FormDashboardRouter from "./FormDashboardRouter.jsx";
import useFormBuilder from "../../utils/useFormBuilder.js";
import {getFullAssessment} from "/src/Utils/API.js";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {redirect} from "react-router";
import Sidebar from "./Sidebar.jsx";
import {upsertAssessment} from "../../../../Utils/API.js";


function FormDashboard() {
    const {id} = useParams();                               // Checks the url for a form Id; fetches the relevant form
    const [activeView, setActiveView] = useState(0);        // Used for navigating between form dashboard views
    const [shouldQuery, setShouldQuery] = useState(true);  // Temporary solution to prevent useQuery from fetching again Todo: Fix this
    const [loading, setLoading] = useState(null);
    const {showAlert} = useAlert();
    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const form = useFormBuilder();

    const {data, error, isLoading,} = useQuery({
        queryFn: () => getFullAssessment(id),
        queryKey: ["assessment", id],
        enabled: (Boolean(id) === true && shouldQuery === true),
    });

    useEffect(() => {
        if (data) {
            form.setSchema(data);
            setShouldQuery(false)
        }
    }, [data ]);

    const handleSaveOrPublish = useCallback(
        // Wait for user response (continue or cancel)
        async (status) => {
            const userConfirmed = await new Promise((resolve) => {
                showAlert(
                    status === "published" ? "Publish Changes" : "Save Changes",
                    status === "published"
                        ? "Changes will be published and visible to employees."
                        : "Changes will be saved and only visible by you.",
                    () => resolve(false), // Close
                    () => resolve(true) // Continue

                );
            });

            // If continues, validates the form and then inserts into database
            if (userConfirmed) {
                const hasErrors = form.validateSchema();
                if (!hasErrors) {
                    setLoading(true);
                    const error = await upsertAssessment({
                        ...form.schema,
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
        [form.errors, form.schema, showAlert, form.validateSchema]
    );

    if (isLoading || loading) {
        return (
            <Backdrop open={true} sx={{zIndex: 9999}}>
                <CircularProgress size={60}/>
            </Backdrop>
        );
    }
    return (
        <>
            <div className="flex min-w-full h-full  ">
                <div className="w-full h-[calc(100vh-64px)] overflow-y-auto light-scrollbar ">
                    <FormDashboardRouter
                        activeViewId={activeView}
                        form={form}
                    />
                </div>

                <div className="relative right-0 z-10 h-[calc(100vh-64px)]">
                    <Sidebar
                        editField={form.editField}
                        activeView={activeView}
                        onNavigate={handleViewChange}
                        onSave={() => handleSaveOrPublish("draft")}
                        onPublish={() => handleSaveOrPublish("published")}
                    />
                </div>
            </div>

        </>
    );
}

export default FormDashboard;
