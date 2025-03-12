import { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
  Container,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router";
import { DropdownWithButton } from "../../DropdownMenu/index.js";
import ConfirmPopup from "../../Generic/ConfirmPopup.jsx";
import { useQuery } from "@tanstack/react-query";
import TableLayouts from "./TableLayouts.js";
import MenuItem from "@mui/material/MenuItem";

function Table() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [layout, setLayout] = useState(TableLayouts["adminTemplates"]);

  const { data, error, isLoading } = useQuery({
    queryFn: () => layout.queryFn(),
    queryKey: ["assessmentsTable", [layout]],
  });

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "space-between" }}
        >
          <Typography variant="h4">Assessments</Typography>
          <Link to="/dashboard/assessments/edit/new">
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontWeight: 600 }}
              startIcon={<AddIcon />}
            >
              New Assessment
            </Button>
          </Link>
        </Stack>
        <TableContainer component={Paper}>
          <MuiTable>
            <TableHead>
              <TableRow>
                {layout.headers.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  {layout.dataColumns.map((column, i) => (
                    <TableCell key={i}>{row[column] || "N/A"}</TableCell>
                  ))}
                  <TableCell>
                    <DropdownWithButton id={row.id}>
                      {layout.rowActions?.map((action, i) => (
                        <MenuItem key={i}>
                          {action.icon && (
                            <ListItemIcon>{<action.icon />}</ListItemIcon>
                          )}
                          <Link
                            to={action.link(row.id)}
                            className="text-black w-full h-full"
                          >
                            {action.label}
                          </Link>
                        </MenuItem>
                      ))}
                    </DropdownWithButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Stack>
      <ConfirmPopup
        title="Delete Assessment"
        content={"Your assessment will be permanently deleted"}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onContinue={() => setDialogOpen(false)}
      />
    </Container>
  );
}

export default Table;
