import React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import MainMenu from "../Components/dashboard/MainMenu.jsx";
import { Outlet } from "react-router";

function Dashboard() {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            IDEA Toolkit Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <MainMenu />
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
