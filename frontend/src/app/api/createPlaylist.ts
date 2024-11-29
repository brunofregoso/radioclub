import { supabase } from '../lib/supabase';

type DataType = {
    userID: string;
    name: string;
    description: string;
    public: boolean;
    // Add other relevant fields based on the API documentation
  }

export const createPlaylist = async (data: DataType) => {
  const { data: { session } } = await supabase.auth.getSession();
  const providerToken = session?.provider_token;
  console.log("accessToken is", providerToken);
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${data.userID}/playlists` ,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${providerToken}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log("created playlist", response)
    return response.json();
  } catch (error) {
    return error;
  } 
};
