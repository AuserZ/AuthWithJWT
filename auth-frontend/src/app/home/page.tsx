"use client"

import { logout } from "@/be/api"
import useAuthCheck from "@/hook/useAuthCheck"
import { deleteAllToken, getUsernameFromToken } from "@/util/JWTUtil"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { LogOut, Shield, User } from "lucide-react"

const HomePage: React.FC = () => {
  const { isLoading, error } = useAuthCheck()
  const [username, setUsername] = React.useState("")
  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    console.log("getaccess", accessToken)
    if (!accessToken) {
      deleteAllToken()
      router.push("/")
      return
    }
    const username = getUsernameFromToken(accessToken)
    console.log("username", username)
    if (username) setUsername(username)
  }, [router]) // Fixed syntax error here (removed extra parenthesis)

  async function handleLogout() {
    const accesstoken = localStorage.getItem("accesstoken")

    if (!accesstoken) {
      deleteAllToken()
      router.push("/")
      return
    }

    const res = await logout(accesstoken)

    if (res.status === 200) {
      // Using inline notification instead of alert
      deleteAllToken()
      router.push("/")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center text-red-500 mb-4">
            <Shield className="h-12 w-12 mx-auto" />
          </div>
          <h1 className="text-xl font-bold mb-4 text-center text-gray-900">Authentication Error</h1>
          <p className="text-gray-600 mb-6 text-center">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">JWT Auth Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-center">
              <div className="bg-indigo-100 rounded-full p-3">
                <User className="h-12 w-12 text-indigo-600" />
              </div>
            </div>
            <h2 className="mt-4 text-center text-2xl font-extrabold text-gray-900">Welcome, Lord {username}</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              You have successfully logged in with JWT authentication
            </p>
          </div>

          <div className="px-6 py-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
                <p className="mt-2 text-sm text-gray-500">Your account is protected with JWT authentication.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Session Info</h3>
                <p className="mt-2 text-sm text-gray-500">Your session is active and secure.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Last Login</h3>
                <p className="mt-2 text-sm text-gray-500">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage

