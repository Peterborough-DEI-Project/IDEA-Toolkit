import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import React from "react";
import {
  getAssessmentsTemplates,
  getAssessmentSubmissions,
  getPublishedAssessments,
} from "../Form/Builder/dev/__testqueries__.js";

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
    queryFn: getPublishedAssessments,
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
    queryFn: getAssessmentSubmissions,
  },
  // Submissions made by employees
  employeeSubmissions: {
    tableHead: "Submitted Assessments",
    headers: ["Title", "Description", "Status", "Date Submitted", "Actions"],
    dataColumns: ["Title", "Description", "Status", "Date Submitted"],
  },
  queryFn: getAssessmentSubmissions,
};

export default TableLayouts;
