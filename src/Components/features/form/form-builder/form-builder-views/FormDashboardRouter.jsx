import React from "react";
import PropTypes from "prop-types";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormEditor from "../../form-builder-views/form-editor/FormEditor.jsx";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import FormSubmitter from "../../../form-consumer/FormSubmitter.jsx";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ComingSoon from "../../../../../shared/Fallbacks/ComingSoon.jsx";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import SettingsEditor from "../../form-builder-views/settings/SettingsEditor.jsx";

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
    component: SettingsEditor,
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
