import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to BLND!</h1>
      <div>
        <Link href="/welcome" passHref>
          <button style={{ margin: "15px" }} className="inline-block cursosr-pointer rounded-md bg-gray-800">Login</button>
        </Link>
        <button style={{ margin: "15px" }}>Signup</button>
      </div>
    </div>
  );
}
