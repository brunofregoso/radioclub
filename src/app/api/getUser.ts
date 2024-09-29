// getUser.js
import { headers } from 'next/headers';
import { supabase } from '../lib/supabase';



export const getUserAccessToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const providerToken = session?.provider_token;
  console.log("accessToken is", providerToken);
  try {
    const response = await fetch("https://api.spotify.com/v1/me" ,{
        headers: {
            'Authorization': `Bearer ${providerToken}`,
        'Content-Type': 'application/json'
        }
    })
    console.log("reposoonse is", response)
    return response.json();
  } catch (error) {
    return 404;
  } 
};
