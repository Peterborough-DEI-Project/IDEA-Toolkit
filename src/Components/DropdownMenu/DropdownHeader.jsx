import { ListSubheader } from "@mui/material";
import Divider from "@mui/material/Divider";

function DropdownHeader({ value }) {
  return (
    <>
      <ListSubheader>{value}</ListSubheader>
      <Divider sx={{ mb: 1 }} />
    </>
  );
}
export default DropdownHeader;
