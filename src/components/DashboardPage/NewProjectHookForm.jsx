/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
// =================  IMPORT =========================>
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import {
  Autocomplete, Box, Button, Grid, TextField, Slider, Typography, Select, MenuItem, styled,
} from '@mui/material';
import MuiInput from '@mui/material/Input';
import CodeIcon from '@mui/icons-material/Code';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../../supportFunctions.js';
// ===================================================>

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function NewProjectHookForm({ setOpen, setJustSubmitted }) {
  // ..... REACT HOOK FORM ....... //
  const { control, handleSubmit } = useForm({
    reValidateMode: 'onBlur',
  });

  // .......... STATES ............ //
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);

  // .......... HELPER FUNCTIONS ............ //

  const navigate = useNavigate();

  async function getAllSkills() {
    try {
      const results = await axios.get(`${BACKEND_URL}/skills`);
      const { data } = results;
      const skillsArray = [];
      data.forEach((skill) => skillsArray.push(skill));
      setSkills(skillsArray);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllUsers() {
    try {
      const results = await axios.get(`${BACKEND_URL}/users`);
      const { data } = results;
      const currentArray = [];
      data.forEach((user) => {
        if (user.accountType === 'engineer') {
          currentArray.push(user);
        }
      });
      setUsers(currentArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
    getAllSkills();
  }, []);

  async function handleOnSubmit(event) {
    try {
      const postedProject = await axios.post(`${BACKEND_URL}/project`, event);
      setJustSubmitted(true);
      setOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  // .......... COMPONENT .......... //
  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            Create a new project with important features like deadlines, salary, engineer headcount and skillset required.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({ field }) => (
              <>
                <Typography>
                  Project Name:
                </Typography>
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  label="What is the project's name?"
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="industryId"
            defaultValue=""
            render={({ field }) => (
              <>
                <Typography>
                  Client&apos;s Industry:
                </Typography>
                <Select
                  {...field}
                  fullWidth
                >
                  <MenuItem value="1">Airline</MenuItem>
                  <MenuItem value="2">Finance</MenuItem>
                  <MenuItem value="3">Market Research</MenuItem>
                  <MenuItem value="4">Human Resources</MenuItem>
                  <MenuItem value="5">Technology</MenuItem>
                </Select>
              </>

            )}
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Controller
            control={control}
            name="projectSkills"
            render={({ field: { ref, onChange, ...field } }) => (
              <>
                <Typography>
                  Skills Required:
                </Typography>
                <Autocomplete
                  multiple
                  options={skills}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      fullWidth
                      color="warning"
                      inputRef={ref}
                      variant="standard"
                    />
                  )}
                />
              </>

            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="deliveryDeadline"
            defaultValue=""
            render={({ field: { value, ...field } }) => (
              <>
                <Typography>
                  Delivery Deadline (Date):
                </Typography>
                <Typography variant="caption">
                  When must the project be delivered?
                </Typography>
                <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    {...field}
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    renderInput={(params) => <TextField {...params} />}
                  />

                </LocalizationProvider>
              </>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="enrolmentDeadline"
            defaultValue=""
            render={({ field: { value, ...field } }) => (
              <>
                <Typography>
                  Enrolment Deadline (Date and Time):
                </Typography>
                <Typography variant="caption">
                  What is the cut-off time for engineers to apply?
                </Typography>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  fullWidth
                >
                  <DateTimePicker
                    {...field}
                    value={value}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="summary"
            defaultValue="This client needs a ..."
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-multiline-static"
                label="Summarize the project's requirements here:"
                multiline
                fullWidth
                rows={5}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="numberEngineers"
            defaultValue={1}
            render={({ field: { value, ...field } }) => (
              <>
                <Typography>
                  Number of Engineers required:
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <CodeIcon color="secondary" />
                  </Grid>
                  <Grid item xs>
                    <Slider
                      {...field}
                      marks
                      max={10}
                      min={0}
                      step={1}
                      value={value}
                      valueLabelDisplay="auto"
                      color="secondary"
                    />
                  </Grid>
                </Grid>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="minimumSalary"
            defaultValue={30}
            render={({ field: { value, ...field } }) => (
              <>
                <Typography id="input-slider" color="success" gutterBottom>
                  Minimum Salary Paid per Hour:
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid
                    item
                    color="success"
                  >
                    <Typography
                      {...field}
                      variant="h4"
                    >
                      $
                      {' '}
                      {value}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      {...field}
                      color="success"
                      min={0}
                      max={200}
                      step={1}
                      value={typeof value === 'number' ? value : 0}
                      aria-labelledby="input-slider"
                    />
                  </Grid>
                </Grid>
              </>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="stage"
            defaultValue=""
            render={({ field }) => (
              <>
                <Typography>
                  Current Project Stage:
                </Typography>
                <br />
                <Select
                  {...field}
                  fullWidth
                >
                  <MenuItem value="contracting">Contracting</MenuItem>
                  <MenuItem value="sourcing">Sourcing</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="client-review">Client Review</MenuItem>
                  <MenuItem value="payment-pending">Payment Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="projectedHours"
            defaultValue="100"
            render={({ field: { value, ...field } }) => (
              <>
                <Typography>
                  Projected Total Hours to Completion:
                </Typography>
                <Input
                  {...field}
                  value={value}
                  size="medium"
                  fullWidth
                  color="secondary"
                  inputProps={{
                    step: 5,
                    min: 0,
                    type: 'number',
                  }}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="userProjects"
            render={({ field: { ref, onChange, ...field } }) => (
              <>
                <Typography>
                  Pre-select Users for this project:
                </Typography>
                <Autocomplete
                  multiple
                  options={users}
                  getOptionLabel={(option) => String(option.name)}
                  // groupBy={(option) => option.}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      fullWidth
                      inputRef={ref}
                      variant="standard"
                      color="secondary"
                    />
                  )}
                />
              </>

            )}
          />
        </Grid>
      </Grid>
      <br />
      <Button color="success" variant="outlined" type="submit">Submit</Button>
    </Box>
  );
}
