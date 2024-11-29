// getUser.js
import { supabase } from '../lib/supabase';

export const getUserTracks = async (playlistID: string) => { // Make sure userID is a string
  const { data: { session } } = await supabase.auth.getSession();
  const providerToken = session?.provider_token;
  console.log("Access Token is:", providerToken);

  if (!providerToken) {
    console.error("No access token found. Make sure you are authenticated with Spotify.");
    return null;
  }

  try {
    // Use backticks for template literals
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      headers: {
        'Authorization': `Bearer ${providerToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching tracks from Spotify:", errorData);
      return null;
    }

    // Parse and return the response JSON
    const data = await response.json();
    console.log("Playlist tracks:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};
