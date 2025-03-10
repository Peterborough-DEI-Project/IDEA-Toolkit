import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon } from "@mui/material";

function DropdownOption({ icon, label, onClick, children }) {
  return (
    <MenuItem>
      {icon && <ListItemIcon>{<icon />}</ListItemIcon>}
      {children}
    </MenuItem>
  );
}

export default DropdownOption;
