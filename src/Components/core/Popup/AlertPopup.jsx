import {Fragment} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import Btn from "../Button/Btn.jsx";

AlertPopup.propTypes = {
  alert: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
      hint: PropTypes.string,
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
        <DialogContent>
            <p>
                {alert.description.split('\n').map((line, index) => (
                    <Fragment key={index}>
                        {line}
                        <br />
                    </Fragment>
                ))}
            </p>
        </DialogContent>

      <DialogActions>
        {alert.onContinue && <Btn variant="outline" onClick={alert.onClose}>Cancel</Btn>}

        <Btn variant="contained" onClick={alert.onContinue || alert.onClose}>
          {alert.onContinue ? "Continue" : "OK"}
        </Btn>
      </DialogActions>
    </Dialog>
  );
}

export default AlertPopup;
