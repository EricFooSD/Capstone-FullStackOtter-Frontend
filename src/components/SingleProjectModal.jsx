/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import {
  ButtonGroup,
  Chip,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Container,
  Box,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import BACKEND_URL from '../supportFunctions.js';
import Iconify from './Iconify.jsx';
import { UserContext } from './UserContext.jsx';

import CircularIndeterminate from './CircularIndeterminate.jsx';
import UserMoreMenu from './UserMoreMenu.jsx';
import HorizontalStepper from './HorizontalStepper.jsx';
import SingleProjectKanbanModal from './SingleProjectKanbanModal.jsx';

export default function SingleProjectModal({ rowContent, setJustSubmitted }) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [scroll] = useState('paper');

  const [showLoading, setShowLoading] = useState(true);
  const [showJoinButton, setShowJoinButton] = useState(false);

  const [usersList, setUsersList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

  const checkIfUserIsAlreadyEnrolledHere = () => {
    if (usersList.some((name) => name === user.name)) {
      console.log('user already enrolled in this project!');
      return true;
    } return false;
  };

  async function addUserToProject() {
    try {
      const enrolUserToProjectObject = {
        userId: user.id,
        projectId: rowContent.id,
      };
      const enrolUser = await axios.post(`${BACKEND_URL}/project/enrol-user/${user.id}`, enrolUserToProjectObject);
      console.log(enrolUser);
    } catch (error) {
      console.log(error);
    }
  }
  const handleAddUserToProject = () => {
    console.log('USER ID:', user.id, 'ADDED PROJECT', rowContent.id);
    setOpen(false);
    addUserToProject();
    setJustSubmitted(true);
  };

  const checkIfProjectFull = () => {
    const engineersEnrolled = Number(rowContent.user_projects.length);
    const engineersRequired = Number(rowContent.noEngineersRequired);
    if ((engineersEnrolled / engineersRequired) === 1) return true;
    return false;
  };

  const checkDateValid = () => {
    const date = (rowContent.deliveryDeadline.slice(0, 10)).value;
    const varDate = new Date(date); // dd-mm-YYYY
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // check if the project deadline date is bigger than today, if yes, TRUE
    if (varDate >= today) {
      console.log('checkDateValid!');
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (rowContent.stage === 'sourcing' && !checkDateValid() && !checkIfProjectFull() && user.accountType === 'engineer' && !checkIfUserIsAlreadyEnrolledHere()) {
      setShowJoinButton(true);
    } else {
      console.log('this user cannot join this project.');
      setShowJoinButton(false);
    }
  }, []);

  async function getUsersAndSkillsForThisProject() {
    try {
      const results = await axios.get(`${BACKEND_URL}/project/${rowContent.id}`);
      const { data } = results;
      console.log(data);
      const usersArray = [];
      const skillsArray = [];
      data.skills.forEach((skillObject) => skillsArray.push(skillObject.skill.name));
      data.users.forEach((userObject) => usersArray.push(userObject.user.name));
      console.log(usersArray);
      if (rowContent.stage === 'sourcing' && !checkDateValid() && !checkIfProjectFull() && user.accountType === 'engineer' && !(usersArray.some((name) => name === user.name))) {
        setShowJoinButton(true);
      } else {
        console.log('this user cannot join this project.');
        setShowJoinButton(false);
      }
      setSkillsList(skillsArray);
      setUsersList(usersArray);
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickOpen = () => () => {
    setOpen(true);
    setTimeout(getUsersAndSkillsForThisProject, 1500);
  };

  const handleClose = () => {
    setShowLoading(true);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen()}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={11}>
              <Typography component="span" variant="h3">
                {' '}
                {rowContent.name}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {!showLoading && user.accountType === 'manager' && <UserMoreMenu rowContent={rowContent} setJustSubmitted={setJustSubmitted} />}
            </Grid>
          </Grid>

        </DialogTitle>

        {showLoading ? (
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <CircularIndeterminate showLoading={showLoading} />
          </Grid>

        ) : (
          <DialogContent component="div" dividers={scroll === 'paper'}>
            <DialogContentText
              component="div"
              id="scroll-dialog-description"
              // ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Container maxWidth="md" alignItems="center">
                {' '}

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                  maxWidth="sm"
                >
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <HorizontalStepper stage={rowContent.stage} projectId={rowContent.id} setJustSubmitted={setJustSubmitted} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3" textAlign="center" color="green.main">
                        {' '}
                        $
                        {rowContent.minimumSalary}
                        /hr
                      </Typography>
                      <Typography variant="h4" textAlign="center" color="primary">
                        @
                        {' '}
                        {rowContent.projectedHours}
                        {' '}
                        projected hours, per engineer
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {skillsList.map((data) => (
                        <Chip
                          key={data}
                          label={data}
                          color="warning"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        id="project-id"
                        label="ID"
                        fullWidth
                        defaultValue={rowContent.id}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="industry"
                        label="Industry"
                        fullWidth
                        defaultValue={rowContent.industry.name}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="created-date"
                        label="Created Date"
                        fullWidth
                        defaultValue={rowContent.createdAt.slice(0, 10)}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="summary"
                        label="Project Summary"
                        fullWidth
                        multiline
                        defaultValue={rowContent.summary}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="span" textAlign="center" color="primary">
                        Number of Engineers Enrolled/Required:
                        {' '}
                        {rowContent.user_projects.length}
                        /
                        {rowContent.noEngineersRequired}
                      </Typography>

                    </Grid>
                    <Grid item xs={12}>
                      {rowContent.user_projects.length !== 0 && (
                        usersList.map((data) => (
                          <Chip
                            key={data}
                            label={data}
                            color="secondary"
                            variant="outlined"
                            size="small"
                          />
                        )))}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="span" textAlign="center" color="primary">
                        Enrolment Deadline:
                        {' '}
                        {rowContent.enrolmentDeadline.slice(0, 10)}
                        /
                        {' '}
                        {rowContent.enrolmentDeadline.slice(11, 16)}
                        {' '}
                        hrs
                      </Typography>

                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="span" textAlign="center" color="error">

                        Delivery Deadline:
                        {' '}

                        {rowContent.deliveryDeadline.slice(0, 10)}
                        /
                        {' '}
                        {rowContent.deliveryDeadline.slice(11, 16)}
                        {' '}
                        hrs
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions alignItems="center">

          {!showLoading && (
          <ButtonGroup variant="contained" aria-label="outlined button group">
            {showJoinButton ? (
              <Button color="success" onClick={(e) => handleAddUserToProject(e)}>
                <ListItemIcon color="success">
                  <Iconify
                    icon="fluent:arrow-join-20-regular"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Join Project" primaryTypographyProps={{ variant: 'body2' }} />
              </Button>
            ) : (
              <Button sx={{ color: 'text.secondary' }} disabled>
                <ListItemIcon>
                  <Iconify
                    icon="fluent:arrow-join-20-regular"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Join Project" primaryTypographyProps={{ variant: 'body2' }} />
              </Button>
            )}
              {rowContent.stage === 'in-progress' && <SingleProjectKanbanModal projectId={rowContent.id} name={rowContent.name} data={rowContent.kanbanData} setJustSubmitted={setJustSubmitted} />}
            {' '}
            <Button onClick={handleClose}>Close</Button>
          </ButtonGroup>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
