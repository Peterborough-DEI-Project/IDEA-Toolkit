import React from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Grid,
    Paper,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Assessment,
    Dashboard as DashboardIcon,
    Person,
    School,
    ExitToApp,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const drawerWidth = 240;

function Dashboard() {
    const [open, setOpen] = React.useState(true);

    const mockData = [
        { name: 'Test 1', score: 85 },
        { name: 'Test 2', score: 90 },
        { name: 'Test 3', score: 78 },
        { name: 'Test 4', score: 95 },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setOpen(!open)}
                        sx={{ marginRight: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        IDEA Toolkit Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Assessment />
                            </ListItemIcon>
                            <ListItemText primary="Assessments" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <School />
                            </ListItemIcon>
                            <ListItemText primary="Courses" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {/* Welcome Card */}
                        <Grid item xs={12}>
                            <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h4">Welcome back, User!</Typography>
                                    <Typography variant="subtitle1">
                                        Track your progress and take new assessments
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Assessment Overview */}
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ p: 2, height: 400 }}>
                                <Typography variant="h6" gutterBottom>
                                    Assessment Progress
                                </Typography>
                                <ResponsiveContainer width="100%" height="85%">
                                    <LineChart data={mockData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>

                        {/* Quick Actions */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 2, height: 400 }}>
                                <Typography variant="h6" gutterBottom>
                                    Quick Actions
                                </Typography>
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
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Dashboard;