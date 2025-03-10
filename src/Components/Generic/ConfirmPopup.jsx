import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

ConfirmPopup.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

function ConfirmPopup({ title, content, open, onClose, onContinue }) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onContinue}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmPopup;
