import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Tabs, Tab, Toolbar, AppBar, Box, Typography, createTheme, ThemeProvider, blueGrey,
} from '@mui/material';
import { UserContext } from '../UserContext.jsx';

// create theme for styling
const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: blueGrey[900],
    },
  },
});

export default function Navbar() {
  // .............STATES...............
  const [value, setValue] = React.useState(0);
  const { user } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="nav" sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar variant="dense">
            <Box flex={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Box
                  component="img"
                  sx={{ marginRight: '1em', height: 40 }}
                  src="https://img.freepik.com/free-vector/face-cute-otter-logo-design-vector-graphic-symbol-icon-sign-illustration-creative-idea_15473-10082.jpg?w=2000"
                  alt="Bosch Logo"
                  to="/"
                />
                <Typography component="span" variant="h5">
                  Full-Stack Otter
                </Typography>
              </Box>
              <Box>
                <Tabs
                  aria-label="Navigation Tabs"
                  indicatorColor="secondary"
                  textColor="inherit"
                  value={value}
                  onChange={handleChange}
                >
                  <Tab
                    label="Home"
                    component={Link}
                    to="/"
                  />
                  {user.accountType !== 'client' && user.length !== 0 && (
                  <Tab
                    label="Dashboard"
                    component={Link}
                    to="/dashboard"
                  />
                  )}
                  {user.accountType === 'manager' && (
                  <Tab
                    label="DocuSein"
                    component={Link}
                    to="/fakeDocusign"
                  />
                  )}
                  {user.accountType === 'client' && (
                  <Tab
                    label="DocuSein"
                    component={Link}
                    to="/fakeDocusign"
                  />
                  )}
                  <Tab
                    label="Search"
                    component={Link}
                    to="/search"
                  />
                  <Tab
                    label="Profile Page"
                    component={Link}
                    to="/profile"
                  />

                  <Tab
                    label="Log In"
                    component={Link}
                    to="/login"
                  />
                </Tabs>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
