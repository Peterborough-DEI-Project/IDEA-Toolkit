import { useState } from "react";
import Button from "@mui/material/Button";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ConfirmPopup from "../../../../Generic/ConfirmPopup.jsx";
import PropTypes from "prop-types";
import AlertPopup from "../../../../Generic/AlertPopup.jsx";

Publish.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function Publish({ onClick }) {
  return (
    <>
      <Button
        color="primary"
        sx={{ fontWeight: 600 }}
        fullWidth
        variant="contained"
        endIcon={<RocketLaunchIcon />}
        onClick={onClick}
      >
        Publish
      </Button>
    </>
  );
}

export default Publish;
