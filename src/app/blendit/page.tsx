import React from 'react';

export default function Blendit() {
  return (
    <div>
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
        <button className="btn">Button</button>
      </form>
    </div>
  );
}
