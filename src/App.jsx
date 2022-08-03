import './App.css';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { grey, blueGrey, green } from '@mui/material/colors';
import store from './redux/store.js';
import Home from './Pages/Home.jsx';
import Search from './Pages/Search.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Profile from './Pages/Profile.jsx';
import ProfileEdit from './Pages/ProfileEdit.jsx';
import { UserContext } from './components/UserContext.jsx';
import BACKEND_URL from './supportFunctions.js';

import AssignUsers from './components/FakeDocusign/AssignUsers.jsx';
import Preparation from './components/FakeDocusign/Preparation.jsx';
import Sign from './components/FakeDocusign/Sign.jsx';
import View from './components/FakeDocusign/View.jsx';
import Welcome from './components/FakeDocusign/Welcome.jsx';
import ResponsiveAppBar from './components/ResponsiveAppBar.jsx';

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    dark: {
      main: grey[700],
      light: grey[300],
    },
    dark2: {
      main: blueGrey[700],
      light: blueGrey[100],
    },
    green: {
      main: green[900],
      light: green[300],
      xlight: green[50],
    },
    greenLight: {
      main: green[300],
    },
    yellow: {
      main: '#ffeb3b',
      dark: '#f57f17',
      lighter: '#fffde7',
    },
    chart: {
      violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
      blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
      green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
      yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
      red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
    },
  },
  typography: {
    fontFamily: [
      'Public Sans, sans-serif',
    ],
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontWeight: 700,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
      ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h6: {
      fontWeight: 400,
      lineHeight: 28 / 18,
      fontSize: pxToRem(17),
      ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    },
    title: {
      fontWeight: 300,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    subtitle2: {
      fontWeight: 200,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    body2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12),
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      letterSpacing: 1.1,
      textTransform: 'uppercase',
    },
    button: {
      fontWeight: 700,
      lineHeight: 24 / 14,
      fontSize: pxToRem(14),
      textTransform: 'capitalize',
    },
  },
});

export default function App() {
  // .............STATES...............
  const [user, setUser] = useState([]);

  // .......... HELPER FUNCTIONS .................
  async function getUserData() {
    try {
      const results = await axios.get(`${BACKEND_URL}/userData`);
      const { data } = results;
      setUser(data);
    } catch (error) {
      console.log('not logged in. Try again.');
      console.log(error);
    }
  }
  // get user data
  useEffect(() => { getUserData(); }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="dashboard" exact element={<Dashboard />} />
              <Route path="profile" exact element={<Profile />} />
              <Route path="search" element={<Search />} />
              <Route path="login" element={<Login />} />
              <Route path="profile/edit" element={<ProfileEdit />} />
              <Route path="fakeDocusign" exact element={<Welcome />} />
              <Route path="assignUsers" exact element={<AssignUsers />} />
              <Route path="prepareDocument" exact element={<Preparation />} />
              <Route path="signDocument" exact element={<Sign />} />
              <Route path="viewDocument" exact element={<View />} />
            </Routes>
          </Provider>
        </ThemeProvider>
      </UserContext.Provider>
    </BrowserRouter>

  );
}
