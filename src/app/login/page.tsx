import React from "react";

export default function login() {
  return (
    <div>
      <h1>Login</h1>
        <form>
          <label>Username</label>
          <input type="text" id="username" name="username" required></input>
          <br></br>
          <label>Password</label>
          <input type="text" id="password" name="password" required></input>
        </form>
    </div>
  );
}
