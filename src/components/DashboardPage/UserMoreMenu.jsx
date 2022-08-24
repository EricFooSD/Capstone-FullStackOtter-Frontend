/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */

// =================  IMPORT =========================>
import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
} from '@mui/material';
import axios from 'axios';
import Iconify from '../SupportComponents/Iconify.jsx';
import { UserContext } from '../UserContext.jsx';
import BACKEND_URL from '../../supportFunctions.js';
// ===================================================>

export default function UserMoreMenu({ rowContent, setJustSubmitted }) {
  // .......... STATES ............ //
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  // .......... HELPER FUNCTIONS ............ //
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSignContractButtonClick = () => {
    setIsOpen(false);
    navigate('/fakeDocusign');
  };

  async function deleteCurrentProject() {
    try {
      const deletion = await axios.delete(`${BACKEND_URL}/project/${rowContent.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteButtonClick = () => {
    deleteCurrentProject();
    setIsOpen(false);
    setJustSubmitted(true);
  };

  // .......... RENDERING COMPONENT .......... //
  return (
    <>
      <IconButton ref={ref} onClick={handleOpen}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {user.accountType === 'manager' && (
        <MenuItem
          sx={{ color: 'text.primary' }}
          onClick={handleSignContractButtonClick}
        >
          <ListItemIcon>
            <Iconify
              sx={{ color: 'text.primary' }}
              icon="clarity:contract-line"
              width={24}
              height={24}
            />
          </ListItemIcon>
          <ListItemText primary="Sign Contract" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        )}

        {user.accountType === 'manager' && (
        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={handleDeleteButtonClick}
        >
          <ListItemIcon>
            <Iconify
              sx={{ color: 'error.main' }}
              icon="eva:trash-2-outline"
              width={24}
              height={24}
            />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        )}
      </Menu>
    </>
  );
}
