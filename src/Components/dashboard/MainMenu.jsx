import React from "react";
import {
  Box,
  Drawer,
  Icon,
  ListItemIcon,
  ListItemText,
  MenuList,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router";
import menuItems from "./menuItems.js";
import MenuItem from "@mui/material/MenuItem";

function MainMenu() {
  return (
    <>
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <MenuList className="">
            <>
              {menuItems.map((item, index) => (
                <MenuItem key={index} sx={{ cursor: "pointer", p: 2 }}>
                  <NavLink to={item.route}>
                    <ListItemIcon>
                      <Icon component={item.icon} />
                      {item.route}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </NavLink>
                </MenuItem>
              ))}
            </>
          </MenuList>
        </Box>
      </Drawer>
    </>
  );
}

export default MainMenu;
