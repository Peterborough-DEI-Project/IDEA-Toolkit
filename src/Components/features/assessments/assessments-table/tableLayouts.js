import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import {getAssessmentsTemplates,} from "../../../../../../Utils/API.js";
import {getAvailableAssessments} from "../../../../Utils/API.js";

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
     // Templates available to employees
    employeeTemplates: {
        tableHead: "Available Assessments",
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
                label: "Create Submission",
                icon: EditOutlined,
                link: (id) => `/dashboard/assessments/submit/${id}`, // TODO: replace with a link to the delete button
            },
        ],
        queryFn: getAvailableAssessments,
    },
    employeSubmissions: {
        tableHead: "Your Submissions",
        headers: [
            "Title",
            "Description",
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
};

export default TableLayouts;
