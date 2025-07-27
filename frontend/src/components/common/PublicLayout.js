import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Event as EventIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const PublicLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleProfileMenuClose();
  };

  const navigationItems = [
    { text: 'Home', path: '/' },
    { text: 'Events', path: '/events' }
  ];

  const drawer = (
    <div className="w-64 h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <EventIcon className="text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">Eventra</span>
        </div>
      </div>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {!user && (
          <div className="mt-4 px-4 border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileOpen(false);
                }}
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate('/register');
                  setMobileOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </List>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppBar position="sticky" className="bg-white shadow-md">
        <Toolbar className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="text-gray-700 mr-2"
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <EventIcon className="text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Eventra</span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="ml-8 flex-grow">
              {navigationItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className={`mx-2 px-3 py-2 rounded-md font-medium transition-colors no-underline ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          )}

          <div className={`${isMobile ? 'flex-grow' : ''}`} />

          {/* Authentication Buttons */}
          {user ? (
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="hidden sm:inline-flex text-blue-600 hover:text-blue-700 font-medium mr-4"
              >
                Dashboard
              </button>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </Avatar>
              </IconButton>
            </div>
          ) : (
            !isMobile && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/login')}
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )
          )}
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={() => { navigate('/dashboard'); handleProfileMenuClose(); }}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
          <AccountCircle sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToApp sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 256 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <EventIcon className="text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">Eventra</span>
              </div>
              <p className="text-gray-600 max-w-md">
                Your premier platform for discovering, creating, and managing events.
                Connect with your community and make every gathering memorable.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Events
                  </Link>
                </li>
                {!user && (
                  <>
                    <li>
                      <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="text-gray-600 hover:text-blue-600 transition-colors">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              © 2024 Eventra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
