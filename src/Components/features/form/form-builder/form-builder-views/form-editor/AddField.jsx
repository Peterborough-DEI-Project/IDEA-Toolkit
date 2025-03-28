import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

AddField.propTypes={
    onClick: PropTypes.func.isRequired,
}

function AddField({ onClick }) {
  return (
    <div className={"flex justify-end"}>
      <Fab onClick={onClick}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default AddField;
