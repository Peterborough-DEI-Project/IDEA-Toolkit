import React from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

AddInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

function AddInput({ onAdd, placeholder }) {
  const [value, setValue] = React.useState("");

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };
  const handleAdd = () => {
    if (value.trim().length > 0) {
      onAdd(value);
      setValue("");
    }
  };
  return (
    <>
      <Stack direction="row" spacing={1} className="items-center ">
        <TextField
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="standard"
          placeholder={placeholder || "Other (please specify)"}
          onKeyDown={(e) => onKeyDown(e)}
        />
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Stack>
    </>
  );
}

export default AddInput;
