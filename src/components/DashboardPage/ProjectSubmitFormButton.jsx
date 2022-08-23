/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Divider,
  Fab,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import NewProjectHookForm from './NewProjectHookForm.jsx';

export default function ProjectSubmitFormButton({ setJustSubmitted }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Tooltip title="Start A New Project">
        <Fab
          component="div"
          onClick={handleClickOpen}
          variant="circular"
          color="green"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            bottom: '25%',
            position: 'fixed',
            right: 100,
          }}
        >
          <IconButton color="inherit" size="large">
            <AddIcon />
          </IconButton>
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Submit New Project</DialogTitle>
        <Divider />
        <DialogContent>
          <NewProjectHookForm setOpen={setOpen} setJustSubmitted={setJustSubmitted} />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Close & Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
