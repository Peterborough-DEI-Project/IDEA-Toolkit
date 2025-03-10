import { useState } from "react";
import Button from "@mui/material/Button";
import ConfirmPopup from "../../../../Generic/ConfirmPopup.jsx";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
import AlertPopup from "../../../../Generic/AlertPopup.jsx";

Save.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function Save({ onClick }) {
  return (
    <>
      <Button
        color="primary"
        sx={{ fontWeight: 600 }}
        fullWidth
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={onClick}
      >
        Save
      </Button>
    </>
  );
}

export default Save;
