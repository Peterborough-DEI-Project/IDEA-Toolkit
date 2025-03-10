import List from "@mui/material/List";
import { ListItem, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Save from "./Actions/Save.jsx";
import Publish from "./Actions/Publish.jsx";
import subViews from "./subViews.js";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

Sidebar.propTypes = {
  activeView: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
};

function Sidebar({ activeView, onNavigate, onSave, onPublish }) {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar />
      <Divider />

      <Stack className="flex flex-col justify-between h-full">
        {/*Top list*/}
        <List>
          <>
            {subViews.map((item) => (
              <ListItem key={item.id}>
                <Button
                  sx={{ fontWeight: 600 }}
                  fullWidth={true}
                  variant={activeView === item.id ? "contained" : "text"}
                  startIcon={<item.icon />}
                  onClick={() => onNavigate(item.id)}
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
          </>
        </List>

        {/*Bottom half: save and publish*/}
        <List>
          <ListItem>
            <Save onClick={onSave} />
          </ListItem>
          <ListItem>
            <Publish onClick={onPublish} />
          </ListItem>
        </List>
      </Stack>
    </Drawer>
  );
}

export default Sidebar;
