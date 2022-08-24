/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
// =================  IMPORT =========================>
import React, {
  useState, useEffect, useContext, forwardRef,
} from 'react';
import {
  Grid, Box, Typography, Container, Divider, Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import BACKEND_URL from '../supportFunctions.js';
import { UserContext } from '../components/UserContext.jsx';
import ProjectSubmitFormButton from '../components/DashboardPage/ProjectSubmitFormButton.jsx';
import LinearIndeterminate from '../components/SupportComponents/LinearIndeterminate.jsx';
import DashboardTable from '../components/DashboardPage/DashboardTable.jsx';
import DashboardWidgetSummary from '../components/DashboardPage/DashboardWidgetSummary.jsx';
import DashboardPieChart from '../components/DashboardPage/DashboardPieChart.jsx';
import DashboardBarChart from '../components/DashboardPage/DashboardBarChart.jsx';
// ===================================================>

// .......... HELPER FUNCTIONS .................

/**
 * @desc to do tally of requested skill
 * @param {array} data array of projects
 * @returns tally of skill and count
 */
const getSkillsData = (data) => {
  const skillsDataTally = {};
  data.forEach((project) => {
    project.skills.forEach((skill) => {
      const skillName = skill.name;
      if (skillName in skillsDataTally) {
        skillsDataTally[skillName] += 1;
      } else { skillsDataTally[skillName] = 1; }
    });
  });
  return skillsDataTally;
};

/**
 * @desc to do tally of type of projects of user
 * @param {array} data array of projects
 * @returns tally projects and count
 */
const getProjectsData = (userType, data) => {
  // tally skills count from projects
  const projectDataTally = {};
  data.forEach((id) => {
    let statusName = '';
    if (userType === 'PM') { statusName = id.stage; }
    else { statusName = id.project.stage; }
    if (statusName in projectDataTally) {
      projectDataTally[statusName] += 1;
    } else { projectDataTally[statusName] = 1; }
  });
  return projectDataTally;
};

/**
 * @desc convert a tally in object format to an array of objects for population in chart
 * @param {object} dataTally tally
 * @returns an array of objects
 */
const configureDataForChart = (dataTally) => {
  const chartData = [];
  Object.keys(dataTally).forEach((key) => chartData.push({
    label: key,
    value: dataTally[key],
  }));
  return chartData;
};

export default function Dashboard() {
  // .......... STATES .................

  // to be used for user profile data
  const { user } = useContext(UserContext);

  // to show loading states
  const [showLoading, setShowLoading] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // to populate current projects table
  const [currentProjects, setCurrentProjects] = useState([]);

  // to populate open projects table
  const [openProjects, setOpenProjects] = useState([]);

  // to populate completed projects table
  const [completedProjects, setCompletedProjects] = useState([]);

  // to populate required skills bar chart
  const [skillsData, setSkillsData] = useState([]);

  // to populate projects pie chart
  const [projectsChartData, setProjectsChartData] = useState([]);

  // for alert snack bar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // .......... HELPER FUNCTIONS ............ //
  const Alert = forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // query to DB when user is Engineer
  async function getCurrentProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/current/${user.id}`);
      const { data } = results;
      const currentArray = [];
      data.forEach((project) => currentArray.push(project));
      // update state for current projects table
      setCurrentProjects(currentArray);
      // update state for current projects pie chart
      setProjectsChartData(configureDataForChart(getProjectsData('NotPM', currentArray)));
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // query to DB when user is Engineer
  async function getOpenProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/open`);
      const { data } = results;
      const openArray = [];

      data.forEach((project) => {
        if (project.user_projects.some((userInProject) => userInProject.userId === user.id)) {
          console.log('we have a repeat project already enrolled. skipping push of this project to openArray...');
        } else {
          openArray.push(project);
        }
      });
      // update state for open projects table
      setOpenProjects(openArray);
      // update state for requested skills bar chart
      setSkillsData(configureDataForChart(getSkillsData(openArray)));
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // query to DB when user is Engineer
  async function getUserCompletedProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/completed/${user.id}`);
      const { data } = results;
      const completedArray = [];
      data.forEach((project) => completedArray.push(project));
      // update state for completed projects table
      setCompletedProjects(completedArray);
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // query to DB when user is Project Manager
  async function getAllProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects`);
      const { data } = results;

      const currentArray = [];
      const openArray = [];
      const completedArray = [];

      data.forEach((project) => {
        if (project.stage === 'in-progress' || project.stage === 'client-review') {
          currentArray.push(project);
        } else if (project.stage === 'payment-pending' || project.stage === 'completed') {
          completedArray.push(project);
        } else {
          openArray.push(project);
        }
      });

      // update state for tables
      setCurrentProjects(currentArray);
      setOpenProjects(openArray);
      setCompletedProjects(completedArray);

      // update state for charts
      setSkillsData(configureDataForChart(getSkillsData(openArray)));
      setProjectsChartData(configureDataForChart(getProjectsData('PM', currentArray)));
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setShowLoading(true);
    if (user.accountType === 'manager') {
      setTimeout(getAllProjects,
        1500);
      setJustSubmitted(false);
      setSnackbarOpen(true);
    } else {
      setTimeout(getCurrentProjects,
        1500);
      setTimeout(getOpenProjects,
        1500);
      setTimeout(getUserCompletedProjects,
        1500);
      setJustSubmitted(false);
      setSnackbarOpen(true);
    }
  }, [justSubmitted]);

  // .......... COMPONENT .......... //

  if (user.length === 0) {
    return (
      <div id="page-container">
        <h1>
          You are logged out! Please login to view more pages.
        </h1>
      </div>
    );
  }

  return (
    <>
      <main>
        {user.accountType === 'manager' && <ProjectSubmitFormButton setJustSubmitted={setJustSubmitted} />}
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
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Dashboard
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              View all your current, available and completed projects
            </Typography>
          </Container>
        </Box>

        <Container sx={{ py: 2 }} maxWidth="lg">
          <Grid container spacing={1}>

            {/* Your Projects Pie Chart */}
            <Grid item xs={12} sm={4} md={4}>
              <DashboardPieChart
                title="Your Projects"
                chartData={projectsChartData}
              />
            </Grid>

            {/* Available Projects Icon */}
            <Grid item xs={12} sm={4} md={4}>
              <DashboardWidgetSummary title="Available Projects" total={openProjects.length} color="yellow" icon="line-md:text-box-multiple-twotone" sx={{ mx: 3 }} />
            </Grid>

            {/* Requested Skills Bar Chart */}
            <Grid item xs={12} sm={4} md={4}>
              <DashboardBarChart
                title="Requested Skills"
                chartData={skillsData}
              />
            </Grid>

          </Grid>
        </Container>

        {/* Current Projects Table */}
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Typography variant="h5">
            Current
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid>
              <DashboardTable type="current" user={user} data={currentProjects} setJustSubmitted={setJustSubmitted} />
            </Grid>
          )}
        </Container>

        {/* All Available Projects Table */}
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Typography variant="h5">
            Available
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid>
              <DashboardTable type="available" user={user} data={openProjects} setJustSubmitted={setJustSubmitted} />
            </Grid>
          )}
        </Container>

        {/* Completed Projects Table */}
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Typography variant="h5">
            Completed
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid>
              <DashboardTable type="completed" user={user} data={completedProjects} setJustSubmitted={setJustSubmitted} />
            </Grid>
          )}
        </Container>

        {/* Alert & Snackbar */}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
            Dashboard refreshing!
          </Alert>
        </Snackbar>
      </main>

    </>
  );
}
