/* eslint-disable max-len */

// =================  IMPORT =========================>
import React, { useContext } from 'react';
import {
  Box, Container, Avatar, Badge, TextField, Chip, Typography, Grid, Button,
} from '@mui/material';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext.jsx';
// ===================================================>

export default function Profile() {
  // getting user data from useContext in UserContext
  const { user } = useContext(UserContext);

  // .......... HELPER FUNCTIONS .................

  const navigate = useNavigate();

  const navigateEdit = () => {
    navigate('edit');
  };

  // return message when user is not logged in
  if (user.length === 0) {
    return (
      <div id="page-container">
        <h1>
          You are logged out! Please login to view your Profile.
        </h1>
      </div>
    );
  }

  // run below when user is logged in
  if (user.length !== 0) {
    // role and account mapping for icons
    let accountMapping = {};
    if (user.accountType === 'engineer') {
      accountMapping = { name: 'Software Engineer', icon: HandymanTwoToneIcon, color: 'secondary' };
    }
    if (user.accountType === 'manager') {
      accountMapping = { name: 'Manager', icon: ManageAccountsTwoToneIcon, color: 'warning' };
    }
    if (user.accountType === 'client') {
      accountMapping = { name: 'Client', icon: WorkTwoToneIcon, color: 'info' };
    }

    // .......... RENDERING COMPONENT .......... //

    return (
      <>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 4,
            pb: 1,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Welcome back,
              {' '}
              {user.username}
              !
              {' '}

            </Typography>
            <Typography
              variant="h6"
              align="left"
              color="text.secondary"
              paragraph
            >
              Check out your profile data
            </Typography>
            <Box sx={{ margin: 2 }}>
              <Badge
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={(
                  <Chip
                    icon={<accountMapping.icon />}
                    label={accountMapping.name}
                    color={accountMapping.color}
                    size="small"
                  />
            )}
              >
                <Avatar
                  alt="Nothing"
                  src={user.profilePhoto}
                  sx={{ width: 100, height: 100 }}
                />
              </Badge>
            </Box>
          </Container>
          <Container sx={{ padding: 1 }} maxWidth="lg">
            {user.skills.map((data) => (
              <Chip
                key={data.id}
                label={data.name}
                color="warning"
                variant="outlined"
                size="small"
              />
            ))}
          </Container>
        </Box>
        {/* <Box sx={{ margin: 3 }}> */}
        <Container maxWidth="lg">
          {' '}
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            maxWidth="lg"
          >
            <Grid
              container
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={12}>
                <TextField
                  id="name"
                  label="My Name"
                  multiline
                  fullWidth
                  defaultValue={user.name}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="aboutMe"
                  label="About Me"
                  multiline
                  fullWidth
                  defaultValue={user.aboutMe}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="experience"
                  label="My Experience"
                  multiline
                  fullWidth
                  defaultValue={user.experience}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={9}>
                {' '}
                <TextField
                  id="email"
                  label="My Email Address"
                  fullWidth
                  defaultValue={user.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />

              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="location"
                  label="My Location"
                  fullWidth
                  defaultValue={user.location}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="minimumSalary"
                  label="My Minimum Salary"
                  defaultValue={user.minimumSalary}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="industry"
                  label="My Industry"
                  fullWidth
                  defaultValue={user.industry.name}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="portfolioUrl"
                  label="My Profolio link"
                  fullWidth
                  defaultValue={user.portfolioUrl}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
              </Grid>

            </Grid>
            <Button sx={{ margin: 2 }} variant="contained" color="success" disableElevation onClick={navigateEdit}>
              Edit Profile
            </Button>
          </Box>
        </Container>
      </>
    );
  }
}
