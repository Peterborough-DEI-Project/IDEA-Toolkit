import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

AlertPopup.propTypes = {
  alert: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onContinue: PropTypes.func,
  }).isRequired,
};

function AlertPopup({ alert }) {
  if (alert === null) {
    return;
  }
  return (
    <Dialog open={true} onClose={alert.onClose}>
      <DialogTitle>{alert.title || "Alert"}</DialogTitle>
      <DialogContent>{alert.description}</DialogContent>
      <DialogActions>
        {alert.onContinue && <Button onClick={alert.onClose}>Cancel</Button>}

        <Button variant="contained" onClick={alert.onContinue || alert.onClose}>
          {alert.onContinue ? "Continue" : "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertPopup;
