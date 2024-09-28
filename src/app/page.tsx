"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { supabase } from "./lib/supabase";


export default function Home() {
  const getSession = async () => {
    const {
      data: {
          session
      }
  } = await supabase.auth.getSession();
  console.log(session);

  }

  useEffect(() => {
    getSession()
  }, [])
  
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to BLND!</h1>
      <div>
        <Link href="/welcome" passHref>
          <button style={{ margin: "15px" }}>Login</button>
        </Link>
        <button style={{ margin: "15px" }}>Signup</button>
      </div>
    </div>
  );
}
