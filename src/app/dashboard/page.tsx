// pages/dashboard.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Your Supabase client

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

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
