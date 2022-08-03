/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { UserContext } from '../components/UserContext.jsx';
import BACKEND_URL from '../supportFunctions.js';
import Iconify from '../components/Iconify.jsx';

const cookies = new Cookies();

export default function Login() {
  // .......... STATES .................
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // .......... HELPER FUNCTIONS .................
  const Alert = forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const navigate = useNavigate();

  // AJAX call to attempt login. if sucessful, return all relevant account info
  const attemptLogin = () => {
    axios
      .post(`${BACKEND_URL}/attemptLogin`, { username, password })
      .then((response) => {
        console.log('response', response.data);
        if (response.data.status) {
          // if login status = true then update the global UserContext data
          setUser(response.data.user);
          // update access token in cookies
          const { token } = response.data;
          cookies.set('token', `${token}`, { path: '/' });
          // redirect to dashboard
          navigate('../profile', { replace: true });
        } else {
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>
        {' '}
        {new Date().getFullYear()}
        .
      </Typography>
    );
  }

  //       RENDERING OF COMPONENT
  // ================================

  // return message when user is already logged in
  if (user.length !== 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            {user.username}
            , you&apos;ve already logged in!
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Head to the Dashboard to find some projects.
          </Typography>
        </Container>
      </Box>
    );
  }

  // return log in component if user is not logged in
  if (user.length === 0) {
    return (
      <Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Invalid Username / Password
          </Alert>
        </Snackbar>

        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url("http://ricemedia.co/wp-content/uploads/2018/02/rice-media-otter-obsession-9.jpg")',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <Iconify icon="line-md:account" width={30} height={30} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={attemptLogin}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
