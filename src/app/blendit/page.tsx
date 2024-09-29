"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Your Supabase client
import { getUserAccessToken } from "../api/getUser";
import { getUserPlaylist } from "../api/getPlaylist";
import React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Blendit() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]); // State to hold playlists
  const [selectedPlaylist, setSelectedPlaylist] = useState(''); // State to track selected playlist

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Redirect to login if session is not available
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
      console.log("fetched playlists is", fetchedPlaylists)
      if (fetchedPlaylists) {
        const items = fetchedPlaylists.items;
        console.log("items array is", items)
        setPlaylists(items); // Set fetched playlists to state
      }
    };

    fetchUserPlaylists();
  }, []);

  useEffect(() => {
    console.log("Playlists state has been updated:", playlists);
  }, [playlists]);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner or message
  }

  const handlePlaylistChange = (event: SelectChangeEvent) => {
    setSelectedPlaylist(event.target.value as string);
  };

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
          {/* First Dropdown for User's Playlist */}
          <FormControl 
            fullWidth
            sx={{
              mb: 2,
              width: '300px',
            }}
          >
            <InputLabel id="user-playlist-select-label">Playlist</InputLabel>
            <Select
              labelId="user-playlist-select-label"
              id="user-playlist-select"
              value={selectedPlaylist}
              label="Playlist"
              onChange={handlePlaylistChange}
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
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

          {/* Second Dropdown (Static Example) */}
          <FormControl fullWidth>
            <InputLabel id="user-friend-select-label">Friend</InputLabel>
            <Select
              labelId="user-friend-select-label"
              id="user-friend-select"
              label="Friend"
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
            >
              <MenuItem value={10}>Friend 1</MenuItem>
              <MenuItem value={20}>Friend 2</MenuItem>
              <MenuItem value={30}>Friend 3</MenuItem>
            </Select>
          </FormControl>

          {/* Third Dropdown (Static Example) */}
          <FormControl fullWidth>
            <InputLabel id="user-friend-playlist-select-label">Friend Playlist</InputLabel>
            <Select
              labelId="user-friend-playlist-select-label"
              id="user-friend-playlist-select"
              label="Friend Playlist"
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
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
      </div>
    </>
  );
}
