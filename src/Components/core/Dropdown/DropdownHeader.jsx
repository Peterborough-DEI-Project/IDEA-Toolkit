import { ListSubheader } from "@mui/material";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

DropdownHeader.propTypes={
    value: PropTypes.any,
}

function DropdownHeader({ value }) {
  return (
    <>
      <ListSubheader>{value}</ListSubheader>
      <Divider sx={{ mb: 1 }} />
    </>
  );
}
export default DropdownHeader;
