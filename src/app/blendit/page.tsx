"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Your Supabase client
import { getUserAccessToken } from "../api/getUser";
import { getUserPlaylist } from "../api/getPlaylist";
import { getUserTracks } from "../api/getTracks"; // Ensure this is imported
import React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createPlaylist } from "../api/createPlaylist";


export default function Blendit() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      const accessToken = await getUserAccessToken();
      const userID = accessToken.id;
      const fetchedPlaylists = await getUserPlaylist(userID);
      if (fetchedPlaylists) {
        setPlaylists(fetchedPlaylists.items);
      }
    };

    fetchUserPlaylists();
  }, []);

  const handlePlaylistChange = (event: SelectChangeEvent) => {
    setSelectedPlaylist(event.target.value as string);
  };

  const handleBlendClick = async () => {
    if (!selectedPlaylist) {
      alert("Please select a playlist.");
      return;
    }

    try {
      const userTracks = await getUserTracks(selectedPlaylist);
      console.log("User tracks fetched:", userTracks);
      // Handle the user tracks as needed
    } catch (error) {
      console.error("Error fetching user tracks:", error);
      alert("Failed to fetch user tracks.");
    }
  };

  const handleUploadSpotify = async () => {
    try {
      const accessToken = await getUserAccessToken();
      const userID = accessToken.id;
      const data = {
        userID: userID,
        name: "blended",
        description: "playlist created by blnd",
        public: false,
      }
      createPlaylist(data);
      // Handle the user tracks as needed
    } catch (error) {
      console.error("Error creating playlist", error);
      alert("Failed to fetch user tracks.");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Blendit</title>
      </Head>

      <h1 className="text-5xl font-bold font-['Planet_Kosmos'] text-center mt-5 mb-5">
        Blendit
      </h1>

      <h2 className="text-3xl font-bold font-['Planet_Kosmos'] text-center mt-3 mb-3">
        Blend Your Vibes with Your Friend's Jams – Create the Ultimate Blended Playlist!
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100vh',
        }}
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <FormControl 
            fullWidth
            sx={{ mb: 2, width: '300px' }}
          >
            <InputLabel id="user-playlist-select-label">Playlist</InputLabel>
            <Select
              labelId="user-playlist-select-label"
              id="user-playlist-select"
              value={selectedPlaylist}
              label="Playlist"
              onChange={handlePlaylistChange}
              sx={{ backgroundColor: 'white', color: 'black' }}
            >
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <MenuItem key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No playlists found</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Static Friend Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="user-friend-select-label">Friend</InputLabel>
            <Select
              labelId="user-friend-select-label"
              id="user-friend-select"
              label="Friend"
              sx={{ backgroundColor: 'white', color: 'black' }}
            >
              <MenuItem value={10}>Friend 1</MenuItem>
              <MenuItem value={20}>Friend 2</MenuItem>
              <MenuItem value={30}>Friend 3</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="user-friend-playlist-select-label">Friend Playlist</InputLabel>
            <Select
              labelId="user-friend-playlist-select-label"
              id="user-friend-playlist-select"
              label="Friend Playlist"
              sx={{ backgroundColor: 'white', color: 'black' }}
            >
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <MenuItem key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No playlists found</MenuItem>
              )}
            </Select>
          </FormControl>
        </form>
        <button onClick={handleBlendClick}>Blend</button>
        <button onClick={handleUploadSpotify}>Upload to Spotify</button>
      </div>
    </>
  );
}
