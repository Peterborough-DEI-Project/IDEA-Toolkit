import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
