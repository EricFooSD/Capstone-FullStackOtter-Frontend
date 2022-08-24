/* eslint-disable max-len */

// =================  IMPORT =========================>
import { Link, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import React, { useContext, useState } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Avatar, MenuItem, Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserContext } from '../UserContext.jsx';
// ===================================================>

// to handle cookies for logout function
const cookies = new Cookies();

// ........ STYLING ........ //
const headerNav = {
  textAlign: 'center',
  color: 'primary.main',
  fontWeight: '600',
};

export default function ResponsiveAppBar() {
  // .............STATES...............
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  // .......... HELPER FUNCTIONS .................
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    cookies.remove('token', {});
    setUser([]);
    setAnchorElUser(null);
    navigate('../login', { replace: true });
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // .......... COMPONENT .................
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleOpenNavMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          <MenuItem key="Home" onClick={handleCloseNavMenu}>
            <Nav.Link as={Link} to="/" style={{ textDecoration: 'none' }}>
              <Typography component="span" sx={headerNav}>Home</Typography>
            </Nav.Link>
          </MenuItem>

          {user.accountType !== 'client' && user.length !== 0 && (
            <MenuItem key="Dashboard" onClick={handleCloseNavMenu}>
              <Nav.Link as={Link} to="/dashboard" style={{ textDecoration: 'none' }}>
                <Typography component="span" sx={headerNav}>My Dashboard</Typography>
              </Nav.Link>
            </MenuItem>
          )}

          <MenuItem key="Search" onClick={handleCloseNavMenu}>
            <Nav.Link as={Link} to="/search" style={{ textDecoration: 'none' }}>
              <Typography component="span" sx={headerNav}>Search Users</Typography>
            </Nav.Link>
          </MenuItem>

          {user.accountType === 'manager' && (
            <MenuItem key="DocuSein" onClick={handleCloseNavMenu}>
              <Nav.Link as={Link} to="/fakeDocusign" style={{ textDecoration: 'none' }}>
                <Typography component="span" sx={headerNav}>DocuSein</Typography>
              </Nav.Link>
            </MenuItem>
          )}

          {user.accountType === 'client' && (
            <MenuItem key="DocuSein" onClick={handleCloseNavMenu}>
              <Nav.Link as={Link} to="/fakeDocusign" style={{ textDecoration: 'none' }}>
                <Typography component="span" sx={headerNav}>DocuSein</Typography>
              </Nav.Link>
            </MenuItem>
          )}
        </Menu>
        <Typography component="span" variant="title" sx={{ flexGrow: 1, fontFamily: 'Six Caps' }}>
          FullStackOtter
        </Typography>
        <div>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="" src={user.profilePhoto} />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user.length === 0
              && (
              <MenuItem key="login" onClick={handleCloseUserMenu}>
                <Nav.Link as={Link} to="/login" style={{ textDecoration: 'none' }}>
                  <Typography component="span">
                    Login
                  </Typography>
                </Nav.Link>
              </MenuItem>
              )}
            {user.length !== 0 && (
              <Box>
                <Box sx={{ my: 1.5, px: 2.5 }}>
                  <Typography component="span" variant="body1" noWrap>
                    {user.username}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    {user.name}
                  </Typography>
                </Box>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <MenuItem key="profile" onClick={handleCloseUserMenu}>
                  <Nav.Link as={Link} to="/profile" style={{ textDecoration: 'none' }}>
                    <Typography component="span" sx={headerNav}>
                      Profile
                    </Typography>
                  </Nav.Link>
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogoutClick}>
                  <Typography component="span" sx={headerNav}>
                    Logout
                  </Typography>
                </MenuItem>
              </Box>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
