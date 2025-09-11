import { useState } from "react"
import { supabase } from "./supabaseClient"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert("Check your email for confirmation!")
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else setUser(data.user)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div className="flex flex-col gap-4 items-center mt-10">
      {!user ? (
        <>
          <input
            className="border px-2 py-1 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border px-2 py-1 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={signUp}
          >
            Sign Up
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={signIn}
          >
            Sign In
          </button>
        </>
      ) : (
        <>
          <p>Signed in as: {user.email}</p>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={signOut}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  )
}
