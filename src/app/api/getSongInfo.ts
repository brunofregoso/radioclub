import { supabase } from '../lib/supabase';

export const getSongInfo = async (trackIDS: string[]) => { 
  const { data: { session } } = await supabase.auth.getSession();
  const providerToken = session?.provider_token;
  console.log("Access Token is:", providerToken);

  if (!providerToken) {
    console.error("No access token found. Make sure you are authenticated with Spotify.");
    return null;
  }

  try {
    console.log("trackIDS is:", trackIDS)
    let IDcomma = trackIDS.join(',')
    console.log("IDcomma is:", IDcomma)
    const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${IDcomma}`, {
      headers: {
        'Authorization': `Bearer ${providerToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Could not get trackinfo:", errorData);
      return null;
    }

    // Parse and return the response JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};
