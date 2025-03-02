"use client"
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { login } from "@/be/api";

export const LoginPage = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function handleLogin() {
		try {
			const res = await login(username, password);

			if (res.status === 200) {
				const result = await res.data
				localStorage.setItem("accessToken", result.accessToken);
				localStorage.setItem("refreshToken", result.refreshToken);
				router.push("/home")
				return;
			}

			if (res.status === 401) {
				alert("Invalid username or password");
				return;
			} else {
				alert("Failed to login user, Please contact support team");
			}
		} catch (e) {
		};
	}

	return (
		<div>
			<h1 className="text-xl font-bold mb-5 text-center">Auth with JWT</h1>
			<form action={handleLogin} className="text-sm flex flex-col gap-4 w-72">
				<input placeholder="Username" className="p-2 rounded-md border-2" type="text" onChange={((e) => {
					setUsername(e.target.value)
				})} />
				<input placeholder="Password" className="p-2 rounded-md border-2" type="password" onChange={((e) => {
					setPassword(e.target.value)
				})} />
				<button className="w-100 bg-slate-800 text-white  p-2 rounded-md border-2" type="submit">Login</button>
				<p>New to AuthPage? <a className="text-pink-700" href="/register">Create account</a></p>
			</form>
		</div>
	);
};