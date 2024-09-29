// getUser.js
import { headers } from 'next/headers';
import { supabase } from '../lib/supabase';



export const addPlaylist = async (data) => {
  const { data: { session } } = await supabase.auth.getSession();
  const providerToken = session?.provider_token;
  console.log("accessToken is", providerToken);
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${data.playlistID}/tracks` ,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${providerToken}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log("added combined playlist", response)
    return response.json();
  } catch (error) {
    return 404;
  } 
};
