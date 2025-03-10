import React from "react";
import { MenuList } from "@mui/material";
import StyledMenu from "./StyledMenu.jsx";

function DropdownOptions({ location, open, onClose, children }) {
  return (
    <StyledMenu
      anchorEl={location}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={onClose}
    >
      <MenuList sx={{ minWidth: 240 }}>{children}</MenuList>
    </StyledMenu>
  );
}

export default DropdownOptions;
