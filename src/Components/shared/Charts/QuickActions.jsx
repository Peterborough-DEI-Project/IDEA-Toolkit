import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function QuickActions() {
  return (
    <Grid item xs={12} md={8}>
      <Paper sx={{ p: 2, height: 400 }}>
        <Typography variant="h6">Assessment Progress</Typography>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}

export default QuickActions;
