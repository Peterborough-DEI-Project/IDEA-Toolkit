import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

DeleteButton.propTypes = { onClick: PropTypes.func };

function DeleteButton(props) {
  return (
    <IconButton onClick={props.onClick}>
      <ClearIcon />
    </IconButton>
  );
}

export default DeleteButton;
