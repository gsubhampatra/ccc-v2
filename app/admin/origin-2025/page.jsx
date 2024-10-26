'use client'

import AddAdmin from '@/components/admin/AddAdmin'
import React from 'react'
const Secret = () => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [showLogin, setShowLogin] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'developercccbygsubham' && password === '7847916571') {
      setIsLoggedIn(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleDoubleClick = () => {
    setShowLogin(true)
  }

  if (!showLogin) {
    return (
      <div
        onDoubleClick={handleDoubleClick}
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center">
              Super Admin
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-gradient focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    )

  }
  if (isLoggedIn) {
    return <AddAdmin />
  }
}

export default Secret;