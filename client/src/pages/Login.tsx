import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AxiosError } from "axios";
import Logo from "@/assets/logo.png"
export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status === 200) nav("/dashboard");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
{/* LEFT SECTION (White + Blue Card) */}
<div className="relative flex items-center justify-center bg-white p-10">
  {/* Light blurred shapes */}
  <div className="absolute w-72 h-72 bg-blue-200/40 rounded-full blur-3xl top-10 left-20"></div>
  <div className="absolute w-80 h-80 bg-indigo-300/40 rounded-full blur-3xl bottom-16 right-24"></div>

  {/* Night Blue info/Logo card */}
  <div className="relative bg-[#0f1b42]/20 backdrop-blur-xl border border-[#0f1b42]/30 shadow-2xl p-10 rounded-2xl w-[380px] flex flex-col items-center">
    
    {/* LOGO */}
    <img
      src={Logo}
      alt="Boardify Logo"
      className="w-24 h-24 mb-4 opacity-90"
    />

    <h2 className="text-3xl font-bold mb-4 text-center text-[#0a0f2c] tracking-wide">
      Boardify
    </h2>

    <p className="text-center text-[#0a0f2c]/70 text-sm leading-relaxed">
      A clean and beautiful task management experience.
      <br />Stay organised. Stay focused.
    </p>
  </div>
</div>


      {/* RIGHT SECTION (Night Blue + Login Card) */}
      <div className="relative flex items-center justify-center bg-gradient-to-br from-[#0a0f2c] to-[#0f1b42] p-10">
        {/* Dark blurred shapes */}
        <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl bottom-16 right-14"></div>

        {/* Login Card */}
        <div className="relative bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl p-10 rounded-2xl w-[380px] text-white">
          <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">Welcome Back</h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm">Email</label>
              <Input
                placeholder="Enter your email"
                className="mt-1 bg-white/70 text-gray-900 placeholder:text-gray-500 border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="mt-1 bg-white/70 text-gray-900 placeholder:text-gray-500 border-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full py-2 text-lg rounded-xl bg-white text-blue-700 hover:bg-gray-200 transition font-semibold"
            >
              Login
            </Button>

            <p className="text-center text-white/80 text-sm">
              No account?{" "}
              <span
                className="text-white font-semibold cursor-pointer hover:underline"
                onClick={() => nav("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
