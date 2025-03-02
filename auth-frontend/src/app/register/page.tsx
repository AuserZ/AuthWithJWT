"use client"
import { register } from "@/be/api";
import React from "react";

const RegisterPage: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

    async function handleRegister() {
        // Call register API from BE
        if (username.trim() === "")
            return alert("Username is required");

        try {
            const res = await register(email, password, username);
            if (res.status === 201) {
                alert("User registered successfully");
                return;
            }
            alert("Failed to register user, " + res.data.error + ": " + res.data.message);
        } catch (e) {
            alert("Failed to register user, Please contact support team");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div>
                <h1 className="text-xl font-bold mb-5 text-center">Register User</h1>
                <form action={handleRegister} className="text-sm flex flex-col gap-4 w-72">
                    <input required placeholder="Email" className="p-2 rounded-md border-2" type="email" onChange={((e) => {
                        setEmail(e.target.value)
                    })} />
                    <input required placeholder="Username" className="p-2 rounded-md border-2" type="text" onChange={((e) => {
                        setUsername(e.target.value)
                    })} />
                    <input required placeholder="Password" className="p-2 rounded-md border-2" type="password" onChange={((e) => {
                        setPassword(e.target.value)
                    })} />
                    <button className="bg-slate-800 text-white p-2 rounded-md border-2 w-full" type="submit">Register</button>
                    <p>Already have an account? <a className="text-pink-700" href="/">Login</a></p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;