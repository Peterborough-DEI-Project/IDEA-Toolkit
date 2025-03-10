import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar.jsx";
import FormDashboardRouter from "./FormDashboardRouter.jsx";
import useFormBuilder from "../Utils/useFormBuilder.js";
import { insertAssessmentData } from "./dev/__testqueries__.js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullAssessment } from "/src/Utils/API.js";
import AlertPopup from "../../../Generic/AlertPopup.jsx";
import { redirect } from "react-router";

function FormDashboard() {
  const { id } = useParams();
  const [activeView, setActiveView] = useState(0);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(null);
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
    removeError,
    validateSchema,
    setFormSchema,
  } = useFormBuilder();

  const { data, error, isLoading, is } = useQuery({
    queryFn: () => getFullAssessment(id),
    queryKey: ["assessment", id],
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (data) {
      setFormSchema(data);
    }
  }, [data, setFormSchema]);

  const onSave = async () => {
    // Opens an alert dialog -> promise is resolved based on which button the user clicks.
    const userConfirmed = await new Promise((resolve) => {
      setAlert({
        title: "Save Changes",
        description: "Changes will saved and only visible by you, continue?",
        onClose: () => {
          setAlert(null);
          resolve(false);
        },
        onContinue: () => {
          setAlert(null), resolve(true);
        },
      });
    });

    if (userConfirmed) {
      //synchronous function
      const isValid = validateSchema();
      if (isValid === true) {
        setLoading(true);
        const error = await insertAssessmentData(
          {
            ...formSchema,
            status: "draft",
          },
          data,
        );
        setLoading(false);
        if (error) {
          setAlert({
            title: "Error",
            description: `We weren't able to complete your request at this time. Please try again later or contact support.\n 'Message:' ${error.message}`,
            onClose: () => {
              setAlert(null);
            },
          });
        } else {
          setAlert({
            title: "Success",
            description: `Your changes have been saved successfully.`,
            onClose: () => {
              setAlert(null);
              redirect("/dashboard/assessments");
            },
          });
        }
      } else {
        setAlert({
          title: "Action Needed",
          description:
            "Please ensure that all highlighted fields are completed.",
          onClose: () => {
            setAlert(null);
          },
        });
      }
    }
  };

  const onPublish = async () => {
    const userConfirmed = await new Promise((resolve) => {
      setAlert({
        title: "Publish Changes",
        description: "Changes will be published and visible to employees.",
        onClose: () => {
          setAlert(null);
          resolve(false);
        },
        onContinue: () => {
          setAlert(null), resolve(true);
        },
      });
    });

    if (userConfirmed) {
      //synchronous function
      const isValid = validateSchema();
      if (isValid === true) {
        setLoading(true);
        const error = await insertAssessmentData({
          ...formSchema,
          status: "published",
        });
        setLoading(false);
        if (error) {
          setAlert({
            title: "Error",
            description: `We weren't able to complete your request at this time. Please try again later or contact support.\n 'Message:' ${error.message}`,
            onClose: () => {
              setAlert(null);
            },
          });
        } else {
          setAlert({
            title: "Success",
            description: `Your changes have been saved successfully.`,
            onClose: () => {
              setAlert(null);
              redirect("/dashboard/assessments");
            },
          });
        }
      } else {
        setAlert({
          title: "Action Needed",
          description:
            "Please ensure that all highlighted fields are completed.",
          onClose: () => {
            setAlert(null);
          },
        });
      }
    }
  };

  if (isLoading || loading) {
    return <BackDropOverlay loading={true} />;
  }
  return (
    <>
      {/*<pre>{JSON.stringify(formSchema, null, 2)}</pre>*/}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Container maxWidth="md">
          <FormDashboardRouter
            activeViewId={activeView}
            formSchema={formSchema}
            addField={addField}
            editField={editField}
            removeField={removeField}
            handleFormChange={handleFormChange}
            errors={errors}
            removeError={removeError}
          />
        </Container>
        <Sidebar
          activeView={activeView}
          onNavigate={handleViewChange}
          onSave={onSave}
          onPublish={onPublish}
        />
      </Box>
      {alert && <AlertPopup alert={alert} />}
    </>
  );
}

function BackDropOverlay({ loading }) {
  //todo : fix

  return (
    <Backdrop open={loading} sx={{ zIndex: 9999 }}>
      <CircularProgress size={60} />
    </Backdrop>
  );
}

export default FormDashboard;
