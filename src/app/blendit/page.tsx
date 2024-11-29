"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { getUserAccessToken } from "../api/getUser";
import { getUserPlaylist } from "../api/getPlaylist";
import { getUserTracks } from "../api/getTracks";
import React from "react";
import Head from "next/head";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createPlaylist } from "../api/createPlaylist";
import { getRandomCombination } from "../lib/blendlogic";
import { addPlaylist } from "../api/addPlaylist";
import { uriToTrackID } from "../lib/uriToTrackID";
import { getSongInfo } from "../api/getSongInfo";
import { get } from "http";

export default function Blendit() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist1, setSelectedPlaylist1] = useState("");
  const [selectedPlaylist2, setSelectedPlaylist2] = useState("");
  const [blendedUris, setBlendedUris] = useState<string[]>([]);
  const [tracksDisplay, setTracks] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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

  const handlePlaylistChange1 = (event: SelectChangeEvent) => {
    setSelectedPlaylist1(event.target.value as string);
  };

  const handlePlaylistChange2 = (event: SelectChangeEvent) => {
    setSelectedPlaylist2(event.target.value as string);
  };

  interface Track {
    uri: string;
    // Add other properties if necessary
  }

  interface UserTrackItem {
    track: Track;
  }

  const handleBlendClick = async () => {
    if (!selectedPlaylist1 || !selectedPlaylist2) {
      alert("Please select both playlists.");
      return;
    }

    try {
      const userTracks1 = await getUserTracks(selectedPlaylist1);
      const userTracks2 = await getUserTracks(selectedPlaylist2);

      const trackUris1 = userTracks1.items.map(
        (item: UserTrackItem) => item.track.uri
      );
      const trackUris2 = userTracks2.items.map(
        (item: UserTrackItem) => item.track.uri
      );

      interface tracksDisplay {
        tracks: Tracks;
      }

      interface Tracks {
        name: string;
      }

      const blnd: string[] = getRandomCombination(trackUris1, trackUris2);
      setBlendedUris(blnd); // Save the blended URIs to state
      const trackIDS = uriToTrackID(blnd);
      let tracksInfo = await getSongInfo(trackIDS);
      setTracks(tracksInfo);
      console.log("blended tracks are", tracksInfo);
      if (tracksInfo) {
        for (let i = 0; i < tracksDisplay.tracks.length; i++) {
          console.log("Track Name:", tracksDisplay.tracks[i].name);
        }
      }
    } catch (error) {
      console.error("Error fetching user tracks:", error);
      alert("Failed to fetch user tracks.");
    }
  };

  const handleUploadSpotify = async () => {
    if (blendedUris.length === 0) {
      alert("Please blend the playlists first.");
      return;
    }

    try {
      const accessToken = await getUserAccessToken();
      const userID = accessToken.id;

      // Create a new playlist
      const data = {
        userID: userID,
        name: "Blended Playlist",
        description: "Playlist created by Blendit",
        public: false,
      };
      const createdPlaylist = await createPlaylist(data);
      const playlistID = createdPlaylist.id;

      // Add the blended URIs to the new playlist
      const playdata = {
        playlistID: playlistID,
        uris: blendedUris,
        position: 0,
      };
      await addPlaylist(playdata);
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Failed to create playlist.");
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.log("Error signing out", error);
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "80px",
        }}
      >
        <h1
          className="cursor-pointer italic font-extrabold text-6xl"
          style={{
            textAlign: "center",
          }}
        >
          blnd
        </h1>

        {/* Rest of your code here */}
      </div>
      <h2 className="text-3xl font-bold font-['Planet_Kosmos'] text-center mt-3 mb-3">
        Blend Your Vibes with Your Friend&apos;s Jams – Create the Ultimate
        Blended Playlist!
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {/* User Playlist Dropdown */}
          <FormControl fullWidth sx={{ mb: 2, width: "300px" }}>
            <InputLabel id="user-playlist-select-label">Playlist</InputLabel>
            <Select
              labelId="user-playlist-select-label"
              id="user-playlist-select"
              value={selectedPlaylist1}
              label="Playlist"
              onChange={handlePlaylistChange1}
              sx={{ backgroundColor: "white", color: "black" }}
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
            <InputLabel id="friend-playlist-select-label">
              Friend Playlist
            </InputLabel>
            <Select
              labelId="friend-playlist-select-label"
              id="friend-playlist-select"
              value={selectedPlaylist2}
              label="Friend Playlist"
              onChange={handlePlaylistChange2}
              sx={{ backgroundColor: "white", color: "black" }}
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <button
            className="btn max-w-3xl w-40 text-xl font-bold bg-slate-200 hover:text-slate-200 hover:bg-yellow-500"
            onClick={handleBlendClick}
          >
            Blend
          </button>
          <button
            className="btn max-w-3xl w-52 text-xl font-bold bg-slate-200 hover:text-slate-200 hover:bg-yellow-500"
            onClick={handleUploadSpotify}
          >
            Upload to Spotify
          </button>
          <button
            className="btn max-w-3xl w-40 text-xl font-bold bg-slate-200 hover:text-slate-200 hover:bg-yellow-500"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <div>
          <ul>
            <li>
              {tracksDisplay.length > 0  ?(
                tracksDisplay.map((track) => (
                  <div key={track.id}>
                    <h1>{track.name}</h1>
                    <h2>{track.artists[0].name}</h2>
                  </div>
                ))
              ):(
                <h1>No tracks found</h1>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
