import React from 'react'

export default function Signup() {
  return (
    <div>
        <h1>Signup here</h1>
        <form>
            <input type="text" placeholder="Enter your name"/>
            <input type="email" placeholder="Enter your email"/>
            <input type="password" placeholder="Enter your password"/>
            <button>Signup</button>
        </form>
    </div>
  )
}
