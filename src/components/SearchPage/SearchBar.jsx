/* eslint-disable react/prop-types */

// =================  IMPORT =========================>
import React from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
// ===================================================>

export default function SearchBar({ setSearchQuery }) {
  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Type a name or skill..."
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton disabled aria-label="search">
        <SearchIcon style={{ fill: 'blue' }} />
      </IconButton>
    </form>
  );
}
