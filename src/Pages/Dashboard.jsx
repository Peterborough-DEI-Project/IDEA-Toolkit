import React, { useEffect, useState } from 'react';
import { useAuth } from '../Components/AuthContext';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Container,
    Grid,
    Paper,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
} from '@mui/material';
import HomeNav from '../Components/HomeNav';
import {
    Assessment,
    Person,
    Leaderboard,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Dashboard() {
    const { session, signOut } = useAuth();
    const navigate = useNavigate();

    const mockData = [
        { name: 'Test 1', score: 85 },
        { name: 'Test 2', score: 90 },
        { name: 'Test 3', score: 78 },
        { name: 'Test 4', score: 95 },
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1519677584237-752f8853252e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <HomeNav session={session}/>
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 4 }}>
                    <Grid container spacing={4}>
                        {/* Welcome Card */}
                        <Grid item xs={12}>
                            <motion.div {...fadeInUp}>
                                <Card 
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                                            Welcome back, {session?.user?.email?.split('@')[0]}!
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                            Track your progress and take new assessments
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>

                        {/* Assessment Overview */}
                        <Grid item xs={12} md={8}>
                            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                                <Paper 
                                    sx={{
                                        p: 3,
                                        height: 450,
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 500 }}>
                                        Assessment Progress
                                    </Typography>
                                    <ResponsiveContainer width="100%" height="90%">
                                        <LineChart data={mockData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                            <XAxis dataKey="name" stroke="white" />
                                            <YAxis stroke="white" />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    background: 'rgba(255, 255, 255, 0.9)',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                            <Line 
                                                type="monotone" 
                                                dataKey="score" 
                                                stroke="#4CAF50"
                                                strokeWidth={3}
                                                dot={{ stroke: '#4CAF50', strokeWidth: 2, r: 6 }}
                                                activeDot={{ r: 8, stroke: '#4CAF50', strokeWidth: 2 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </motion.div>
                        </Grid>

                        {/* Quick Actions */}
                        <Grid item xs={12} md={4}>
                            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                                <Paper 
                                    sx={{
                                        p: 3,
                                        height: 450,
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 500 }}>
                                        Quick Actions
                                    </Typography>
                                    <List>
                                        {[
                                            { icon: <Assessment />, text: 'Start Assessment', path: '/assessment' },
                                            { icon: <Person />, text: 'Update Profile', path: '/profile' },
                                            { icon: <Leaderboard />, text: 'Leaderboard', path: '/leaderboard' }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <ListItem 
                                                    button 
                                                    onClick={() => handleNavigation(item.path)}
                                                    sx={{
                                                        mb: 2,
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '12px',
                                                        '&:hover': {
                                                            background: 'rgba(255, 255, 255, 0.1)',
                                                        }
                                                    }}
                                                >
                                                    <ListItemIcon sx={{ color: 'white' }}>
                                                        {item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText 
                                                        primary={item.text} 
                                                        sx={{ 
                                                            color: 'white',
                                                            '& .MuiListItemText-primary': {
                                                                fontWeight: 500
                                                            }
                                                        }}
                                                    />
                                                </ListItem>
                                            </motion.div>
                                        ))}
                                    </List>
                                </Paper>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Dashboard;