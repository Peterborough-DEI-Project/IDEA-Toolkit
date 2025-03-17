// TODO: Replace grid-- it is deprecated

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

function Chart(props) {
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 2, height: 400 }}>
        <Typography variant="h6">Quick Actions</Typography>
        <List>
          <ListItem button>
            <ListItemText primary="Start New Assessment" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="View Past Results" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Update Profile" />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}

export default Chart;
