import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import FormSubmitter from "../Submitter/FormSubmitter.jsx";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import FieldsEditor from "./FormEditor.jsx";
import ComingSoon from "../../../Fallbacks/ComingSoon.jsx";

const subViews = [
  {
    id: 0,
    label: "Editor",
    icon: EditOutlinedIcon,
    component: FieldsEditor,
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

export default subViews;
