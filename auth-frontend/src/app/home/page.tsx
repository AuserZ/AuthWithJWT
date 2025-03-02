"use client";
import { logout } from "@/be/api";
import useAuthCheck from "@/hook/useAuthCheck";
import { deleteAllToken, getUsernameFromToken } from "@/util/JWTUtil";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HomePage: React.FC = () => {
  const { isLoading, error } = useAuthCheck();
  const [username, setUsername] = React.useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log('getaccess', accessToken);
    if (!accessToken) {
      deleteAllToken();
      router.push('/');
      return
    }
    const username = getUsernameFromToken(accessToken);
    console.log('username', username);
    if (username)
      setUsername(username);
  }), [router];

  async function handleLogout() {
    const accesstoken = localStorage.getItem("accesstoken");

    if (!accesstoken) {
      deleteAllToken();
      router.push('/');
      return
    }

    const res = await logout(accesstoken);

    if (res.status == 200)
      alert('Logout Successfully');
    deleteAllToken();
    router.push('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-xl font-bold mb-5 text-center">Welcome Lord {username}</h1>
        <button className="text-pink-700" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;