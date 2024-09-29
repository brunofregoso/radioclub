// pages/dashboard.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Your Supabase client
import { getUserAccessToken } from "../api/getUser";
import { getUserPlaylist } from "../api/getPlaylist";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  let accessToken = '';

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log(session)
      console.log(session?.user.id)
      if (!session) {
        // Redirect to login if session is not available
        router.push("/");
      } else {
        // Allow access if session exists
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await getUserAccessToken();
      // Do something with the accessToken if needed
    };

    fetchAccessToken();
  }, []);

  
  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await getUserAccessToken();
      const userID = accessToken.id;
      const playlists = await getUserPlaylist(userID);
      console.log("Playlists are:",playlists)
      console.log("User ID from JSON is:",userID);
      console.log("User API return this:",accessToken);
      // Do something with the accessToken if needed
    };

    fetchAccessToken();
    
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner or message
  }

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      {/* Your protected content goes here */}
    </div>
  );
}
