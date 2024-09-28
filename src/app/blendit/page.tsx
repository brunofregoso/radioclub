import React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Blendit() {
  return (
    <>
      <Head>
        <title>Blendit</title>
      </Head>

      <h1 className="text-5xl font-bold font-['Planet_Kosmos'] text-center mt-5 mb-5">
        Blendit
      </h1>

      <br />

      <h2 className="text-3xl font-bold font-['Planet_Kosmos'] text-center mt-3 mb-3">
        Blend Your Vibes with Your Friend's Jams – Create the Ultimate Blended Playlist!
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centers content horizontally
          justifyContent: 'flex-start', // Centers content vertically
          height: '100vh', // Full viewport height
        }}
      >
        
        <form
          style={{
            display: 'flex', // Enables Flexbox
            flexDirection: 'row', // Aligns items in a row
            gap: '20px', // Adds space between the dropdowns
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          {/* First Dropdown */}
          <FormControl 
            fullWidth
            sx={{
              mb: 2, // Adds margin-bottom spacing between dropdowns
              width: '300px', // Increases the width of the dropdown
            }}
          >
            <InputLabel id="user-playlist-select-label">Playlist</InputLabel>
            <Select
              labelId="user-playlist-select-label"
              id="user-playlist-select"
              label="Playlist"
              sx={{
                backgroundColor: 'white', // Makes the dropdown background white
                color: 'black', // Changes the text color inside the dropdown to black
              }}
            >
              <MenuItem value={10}>playlist 1</MenuItem>
              <MenuItem value={20}>playlist 2</MenuItem>
              <MenuItem value={30}>playlist 3</MenuItem>
            </Select>
          </FormControl>

          {/* Second Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="user-friend-select-label">Friend</InputLabel>
            <Select
              labelId="user-friend-select-label"
              id="user-friend-select"
              label="Playlist"
              sx={{
                backgroundColor: 'white', // Makes the dropdown background white
                color: 'black', // Changes the text color inside the dropdown to black
              }}
            >
              <MenuItem value={10}>playlist 1</MenuItem>
              <MenuItem value={20}>playlist 2</MenuItem>
              <MenuItem value={30}>playlist 3</MenuItem>
            </Select>
          </FormControl>

          {/* Third Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="user-friend-playlist-select-label">Friend Playlist</InputLabel>
            <Select
              labelId="user-friend-playlist-select-label"
              id="user-friend-playlist-select"
              label="Friend Playlist"
              sx={{
                backgroundColor: 'white', // Makes the dropdown background white
                color: 'black', // Changes the text color inside the dropdown to black
              }}
            >
              <MenuItem value={10}>playlist 1</MenuItem>
              <MenuItem value={20}>playlist 2</MenuItem>
              <MenuItem value={30}>playlist 3</MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
    </>
  );
}
