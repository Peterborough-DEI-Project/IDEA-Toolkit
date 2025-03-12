import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import {getAssessmentsTemplates,} from "../../../Utils/API.js";

const TableLayouts = {
    // Templates created by adminstrators
    adminTemplates: {
        tableHead: "Templates",
        headers: [
            "Title",
            "Description",
            "Responses",
            "Created",
            "Status",
            "Actions",
        ],
        dataColumns: ["title", "description", "responses", "created", "status"],
        rowActions: [
            {
                label: "Edit",
                icon: EditOutlined,
                link: (id) => `/dashboard/assessments/edit/${id}`, // TODO: replace with a link to the delete button
            },
            {
                label: "Delete",
                icon: DeleteOutlined,
                link: (id) => `/dashboard/assessments/edit/${id}`, // TODO: replace with a link to the delete button
            },
        ],
        queryFn: getAssessmentsTemplates,
    },
    // Templates available for employee submission
    employeeTemplates: {
        tableHead: "Available Assessments",
        headers: ["Title", "Description", "Status", "Actions"],
        dataColumns: ["title", "description", "status"],
        rowActions: [
            {
                label: "Create Submission",
                icon: EditOutlined,
                link: (id) => `/dashboard/assessments/submit/${id}`, // TODO: replace with a link to create submission
            },
        ],
        queryFn: getAssessmentsTemplates, // TODO: Replace with a function for employees only
    },
    // Submissions administrators can act upon
    adminSubmissions: {
        tableHead: "Employee Submissions",
        headers: [
            "Title",
            "Description",
            "Submitted By",
            "Date Submitted",
            "Status",
            "Actions",
        ],
        dataColumns: [
            "Title",
            "Description",
            "Submitted By",
            "Date Submitted",
            "Status",
        ],
        rowActions: [
            {
                label: "View Submission",
                icon: EditOutlined,
                link: (id) => `/dashboard/assessments/submissions/${id}`, // TODO: replace with a link to view submission
            },
        ],
        queryFn: getAssessmentsTemplates, // TODO: replace with function for getting submissions (admin side)
    },
    // Submissions made by employees
    employeeSubmissions: {
        tableHead: "Submitted Assessments",
        headers: ["Title", "Description", "Status", "Date Submitted", "Actions"],
        dataColumns: ["Title", "Description", "Status", "Date Submitted"],
    },
    queryFn: getAssessmentsTemplates, // Todo: replace with function for getting submissions  (employee side)
};

export default TableLayouts;
