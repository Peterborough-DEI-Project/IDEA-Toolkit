import React from "react";
import PropTypes from "prop-types";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormEditor from "../editors/FormEditor.jsx";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import FormSubmitter from "../../../FormSubmitter/FormSubmitter.jsx";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ComingSoon from "../../../Generic/Fallbacks/ComingSoon.jsx";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

FormDashboardRouter.propTypes = {
 form: PropTypes.any,
};

const subViews = [
  {
    id: 0,
    label: "Editor",
    icon: EditOutlinedIcon,
    component: FormEditor,
  },
  {
    id: 1,
    label: "Preview",
    icon: WysiwygIcon,
    component: FormSubmitter,
  },
  {
    id: 2,
    label: "Rewards",
    icon: WorkspacePremiumOutlinedIcon,
    component: ComingSoon,
  },
  {
    id: 3,
    label: "Settings",
    icon: BuildOutlinedIcon,
    component: ComingSoon,
  },
];

function FormDashboardRouter({
  activeViewId,
    form,
  ...props
}) {
  const activeView = subViews.find((view) => view.id === activeViewId);

  return activeView.component ? (

    <activeView.component

        form={form}
    />
  ) : (
    <div>View Not Found</div>
  );
}

export default FormDashboardRouter;
