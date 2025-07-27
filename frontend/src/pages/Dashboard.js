import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Event as EventIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  CalendarToday
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
    recentEvents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual dashboard API call
      const mockStats = {
        totalEvents: 12,
        upcomingEvents: 5,
        totalAttendees: 234,
        recentEvents: [
          {
            id: 1,
            title: 'Tech Conference 2024',
            date: '2024-02-15',
            attendees: 50,
            status: 'upcoming'
          },
          {
            id: 2,
            title: 'Workshop: React Fundamentals',
            date: '2024-02-10',
            attendees: 25,
            status: 'completed'
          },
          {
            id: 3,
            title: 'Team Building Event',
            date: '2024-02-08',
            attendees: 30,
            status: 'completed'
          }
        ]
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
          </Box>
          <Box color={`${color}.main`} sx={{ fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>
        {(user?.role === 'ORGANIZER' || user?.role === 'ADMIN') && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create-event')}
          >
            Create Event
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            icon={<EventIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            icon={<CalendarToday />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Attendees"
            value={stats.totalAttendees}
            icon={<PeopleIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Growth Rate"
            value="+12%"
            icon={<TrendingUpIcon />}
            color="info"
          />
        </Grid>

        {/* Recent Events */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Events
            </Typography>
            <List>
              {stats.recentEvents.map((event, index) => (
                <React.Fragment key={event.id}>
                  <ListItem
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.date} • ${event.attendees} attendees`}
                    />
                    <Chip
                      label={event.status}
                      color={event.status === 'upcoming' ? 'primary' : 'default'}
                      size="small"
                    />
                  </ListItem>
                  {index < stats.recentEvents.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Box mt={2}>
              <Button
                variant="outlined"
                onClick={() => navigate('/events')}
                fullWidth
              >
                View All Events
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="outlined"
                startIcon={<EventIcon />}
                onClick={() => navigate('/events')}
                fullWidth
              >
                Browse Events
              </Button>
              {(user?.role === 'ORGANIZER' || user?.role === 'ADMIN') && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/create-event')}
                    fullWidth
                  >
                    Create New Event
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PeopleIcon />}
                    onClick={() => navigate('/attendees')}
                    fullWidth
                  >
                    Manage Attendees
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
