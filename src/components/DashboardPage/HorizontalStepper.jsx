/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
// =================  IMPORT =========================>
import React, { useState, useContext } from 'react';
import {
  Box, Stepper, Step, StepLabel, Button,
} from '@mui/material';
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
import BACKEND_URL from '../../supportFunctions.js';
// ===================================================>

// .... Define steps in ladder .... //
const steps = ['contracting', 'sourcing', 'in-progress', 'client-review', 'payment-pending', 'completed'];

export default function HorizontalStepper({ stage, projectId, setJustSubmitted }) {
  // .......... STATES ............ //
  const { user } = useContext(UserContext);
  const [activeStep, setActiveStep] = useState((steps.indexOf(stage)));

  // .......... HELPER FUNCTIONS ............ //
  async function confirmStageChange() {
    try {
      const newStage = steps[activeStep];
      const currentProjectStageChange = {
        projectId,
        newStage,
      };
      const updatedProject = await axios.put(`${BACKEND_URL}/project/${projectId}`, currentProjectStageChange);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    confirmStageChange();
    setJustSubmitted(true);
  };

  // .......... COMPONENT .......... //
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {user.accountType === 'manager'
      && (
      <>
        {activeStep === steps.length ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Previous Stage
              </Button>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="outlined" color="error" onClick={handleSubmit}>
                Confirm Stage Change
              </Button>
            </Box>
          </>
        )}
      </>
      )}
    </Box>
  );
}
