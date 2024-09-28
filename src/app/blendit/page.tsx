import React from 'react';

export default function GradientForm() {
  return (
    <div
      style={{
        height: '100vh', // Ensures it covers the entire viewport height
        background: 'linear-gradient(to bottom, black, gold)', // Creates the gradient
        display: 'flex', // Centers the content vertically and horizontally
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Sets text color to white for better visibility
      }}
    >
      <form>
        <label>Your Playlist</label>
        <select id="user_playlist_list">
          <option>Playlist 1</option>
        </select>
        <br />
        <label>Friend</label>
        <select id="friend_list">
          <option>Friend 1</option>
        </select>
        <br />
        <label>Friend Playlist</label>
        <select id="friend_playlist_menu">
          <option>Friend Playlist 1</option>
        </select>
        <br />
        <button></button>
      </form>
    </div>
  );
}
