import React from "react";
import { Paper, Stack } from "@mui/material";

function Root({ children }) {
  return (
    <>
      <Paper sx={{ p: 5 }} className="flex flex-col gap-5">
        <Stack spacing={3} direction="column">
          {children}
        </Stack>
      </Paper>
    </>
  );
}

export default Root;
