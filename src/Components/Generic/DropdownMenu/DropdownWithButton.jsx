import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DropdownOptions from "./DropdownOptions.jsx";
import DropdownHeader from "./DropdownHeader.jsx";
import {Button} from "flowbite-react";
import PropTypes from "prop-types";

DropdownWithButton.propTypes={
    header: PropTypes.any,
    children: PropTypes.any,
}

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
      <Button className="w-fit p-0 h-fit border-none   bg-white text-black transition-colors duration-100 ease-in-out" onClick={handleOpen}>
        <MoreHorizIcon />
      </Button>
      <DropdownOptions location={location} open={open} onClose={handleClose}>
        {header && <DropdownHeader>{header}</DropdownHeader>}
        {children}
      </DropdownOptions>
    </>
  );
}

export default DropdownWithButton;
