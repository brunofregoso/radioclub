"use client";
import React from "react";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [data, setData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const router = useRouter();
  const login = async () => {
    try {
      // Initiate OAuth login
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) {
      console.error("Error initiating login:", error.message);
      return;
    }

    // Use the onAuthStateChange to handle the login process
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const user = session.user;
        console.log("User logged in:", user);
        
        // Check if user exists in your database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (userError) {
          console.error("Error fetching user from database:", userError);
          return;
        }

        if (!userData) {
          // User does not exist, create a new user record
          const { error: insertError } = await supabase
            .from('users')
            .insert([{ id: user.id, username: user.user_metadata.username }]);

          if (insertError) {
            console.error("Error creating user:", insertError);
          } else {
            console.log("User created:", user);
          }
        } else {
          console.log("User exists:", userData);
        }

        // Redirect to home after successful login
        router.push("/dashboard");
      }
    });
    } catch (error) {
      console.log("Error logging in:");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value, // Update the corresponding field
    }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Username</label>
        <input type="text" id="username" name="username" required value={data?.username} onChange={handleChange}></input>
        <br></br>
        <label>Password</label>
        <input type="text" id="password" name="password" value={data?.password} onChange={handleChange} required></input>
        <br></br>
        <button type="button" onClick={login}>Login</button>
      </form>
    </div>
  );
}
