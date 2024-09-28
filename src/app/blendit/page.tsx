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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centers content horizontally
          justifyContent: 'center', // Centers content vertically
          height: '100vh', // Full viewport height
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>Blendit</h1>
        
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
          {/*<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>Your Playlist</label>
            <select
              id="user_playlist_list"
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc', // Light border around the dropdown
                marginTop: '5px',
                width: '150px',
              }}
            >
              <option>Playlist 1</option>
            </select>
          </div> */}
          <FormControl fullWidth>
            <InputLabel id="user-playlist-select-label">Playlist</InputLabel>
            <Select
              labelId="user-playlist-select-label"
              id="user-playlist-select"
              //value={age}
              label="Playlist"
              //onChange={handleChange}
            >
              <MenuItem value={10}>playlist 1</MenuItem>
              <MenuItem value={20}>playlist 2</MenuItem>
              <MenuItem value={30}>playlist 3</MenuItem>
            </Select>
          </FormControl>

          {/* Second Dropdown */}
          {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>Friend</label>
            <select
              id="friend_list"
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc', // Light border around the dropdown
                marginTop: '5px',
                width: '150px',
              }}
            >
              <option>Friend 1</option>
            </select>
          </div> */}

          <FormControl fullWidth>
            <InputLabel id="user-friend-select-label">Friend</InputLabel>
            <Select
              labelId="user-friend-select-label"
              id="user-friend-select"
              //value={age}
              label="Playlist"
              //onChange={handleChange}
            >
              <MenuItem value={10}>playlist 1</MenuItem>
              <MenuItem value={20}>playlist 2</MenuItem>
              <MenuItem value={30}>playlist 3</MenuItem>
            </Select>
          </FormControl>

          {/* Third Dropdown */}
          {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>Friend Playlist</label>
            <select
              id="friend_playlist_menu"
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc', // Light border around the dropdown
                marginTop: '5px',
                width: '150px',
              }}
            >
              <option>Friend Playlist 1</option>
            </select>
          </div> */}
          <FormControl fullWidth>
            <InputLabel id="user-friend-playlist-select-label">Playlist</InputLabel>
            <Select
              labelId="user-friend-playlist-select-label"
              id="user-friend-playlist-select"
              //value={age}
              label="Friend Playlist"
              //onChange={handleChange}
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
