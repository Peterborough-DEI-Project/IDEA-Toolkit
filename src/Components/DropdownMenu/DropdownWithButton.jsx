import { useState } from "react";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DropdownOptions from "./DropdownOptions.jsx";
import DropdownHeader from "./DropdownHeader.jsx";

function DropdownWithButton({ header, children }) {
  const [location, setLocation] = useState(false);
  const open = Boolean(location);

  const handleOpen = (e) => {
    setLocation(e.currentTarget);
  };

  const handleClose = () => {
    setLocation(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreHorizIcon />
      </IconButton>
      <DropdownOptions location={location} open={open} onClose={handleClose}>
        {header && <DropdownHeader>{header}</DropdownHeader>}
        {children}
      </DropdownOptions>
    </>
  );
}

export default DropdownWithButton;
