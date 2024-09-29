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
  const [selectedPlaylist1, setSelectedPlaylist1] = useState('');
  const [selectedPlaylist2, setSelectedPlaylist2] = useState('');

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

  // Update the event handler to differentiate between playlist selections
  const handlePlaylistChange1 = (event: SelectChangeEvent) => {
    setSelectedPlaylist1(event.target.value as string);
  };

  const handlePlaylistChange2 = (event: SelectChangeEvent) => {
    setSelectedPlaylist2(event.target.value as string);
  };

  const handleBlendClick = async () => {
    if (!selectedPlaylist1 || !selectedPlaylist2) {
      alert("Please select both playlists.");
      return;
    }

    try {
      const userTracks1 = await getUserTracks(selectedPlaylist1);
      const userTracks2 = await getUserTracks(selectedPlaylist2);
      console.log("User tracks fetched:", { userTracks1, userTracks2 });
      // Handle the blending logic with both userTracks1 and userTracks2
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
      };
      createPlaylist(data);
    } catch (error) {
      console.error("Error creating playlist", error);
      alert("Failed to create playlist.");
    }
  };

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
          {/* User Playlist Dropdown */}
          <FormControl 
            fullWidth
            sx={{ mb: 2, width: '300px' }}
          >
            <InputLabel id="user-playlist-select-label">Playlist</InputLabel>
            <Select
              labelId="user-playlist-select-label"
              id="user-playlist-select"
              value={selectedPlaylist1}
              label="Playlist"
              onChange={handlePlaylistChange1}
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

          {/* Friend Playlist Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="friend-playlist-select-label">Friend Playlist</InputLabel>
            <Select
              labelId="friend-playlist-select-label"
              id="friend-playlist-select"
              value={selectedPlaylist2}
              label="Friend Playlist"
              onChange={handlePlaylistChange2}
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
