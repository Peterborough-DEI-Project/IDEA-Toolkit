import React from "react";
import MuiTable from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Skeleton } from "@mui/material";
import {
  DropdownOption,
  DropdownWithButton,
} from "../../DropdownMenu/index.js";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Link } from "react-router";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DropdownDivider from "../../DropdownMenu/DropdownDivider.jsx";

function __Temp(props) {
  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Responses</TableCell>
          <TableCell align="right">Created</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 6 }).map((_, colIndex) => (
                  <TableCell align="right" key={colIndex}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="right">{item.title}</TableCell>
                <TableCell align="right">{item.description}</TableCell>
                <TableCell align="right">{"5*"}</TableCell>
                <TableCell align="right">{item.published || "null"}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
                <TableCell align="right">
                  <DropdownWithButton id={item.id}>
                    <DropdownOption label="Edit" icon={<EditOutlined />}>
                      <Link
                        to={`/dashboard/assessments/edit/${item.id}`}
                        className="text-black w-full h-full"
                      >
                        {`edit ${item.id}`}
                      </Link>
                    </DropdownOption>
                    <DropdownOption
                      label="Edit"
                      icon={<SettingsOutlinedIcon />}
                    >
                      <Link
                        to={`/dashboard/assessments/${item.id}`}
                        className="text-black w-full h-full"
                      >
                        {"Settings"}
                      </Link>
                    </DropdownOption>
                    <DropdownDivider />
                    <DropdownOption
                      label="Delete"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(item.id)}
                    >
                      {"Delete"}
                    </DropdownOption>
                  </DropdownWithButton>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </MuiTable>
  );
}

export default __Temp;
