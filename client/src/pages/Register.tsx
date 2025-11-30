// import { useState } from "react";
// import { api } from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import type { AxiosError } from "axios";

// export default function Register() {
//   const nav = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {
//     try {
//       const res = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       if (res.status === 201) nav("/");
//     } catch (err: unknown) {
//         const error = err as AxiosError<{ message: string }>;
//       alert(error.response?.data?.message || "Register error");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg p-8 rounded-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

//         <div className="space-y-4">
//           <Input
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <Input
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <Button onClick={handleRegister} className="w-full">
//             Register
//           </Button>

//           <p className="text-center text-sm">
//             Already have an account?{" "}
//             <span
//               className="text-blue-600 cursor-pointer"
//               onClick={() => nav("/")}
//             >
//               Login
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AxiosError } from "axios";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.status === 201) nav("/");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Register error");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SECTION (White background + Info Card) */}
      <div className="relative flex items-center justify-center bg-white p-10">
        <div className="absolute w-72 h-72 bg-blue-200/40 rounded-full blur-3xl top-10 left-20"></div>
        <div className="absolute w-80 h-80 bg-indigo-300/40 rounded-full blur-3xl bottom-16 right-24"></div>

        <div className="relative bg-[#0f1b42]/20 backdrop-blur-xl border border-[#0f1b42]/30 shadow-2xl p-10 rounded-2xl w-[380px]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#0a0f2c] tracking-wide">
            Join Boardify
          </h2>
          <p className="text-center text-[#0a0f2c]/70 text-sm leading-relaxed">
            Create your account and manage tasks effortlessly.
            Collaboration made simple & beautiful.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION (Night Blue background + Register Card) */}
      <div className="relative flex items-center justify-center bg-gradient-to-br from-[#0a0f2c] to-[#0f1b42] p-10">
        <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl bottom-16 right-14"></div>

        <div className="relative bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl p-10 rounded-2xl w-[380px] text-white">
          <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">Create Account</h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm">Full Name</label>
              <Input
                placeholder="Enter your full name"
                className="mt-1 bg-white/70 text-gray-900 placeholder:text-gray-500 border-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              onClick={handleRegister}
              className="w-full py-2 text-lg rounded-xl bg-white text-blue-700 hover:bg-gray-200 transition font-semibold"
            >
              Register
            </Button>

            <p className="text-center text-white/80 text-sm">
              Already have an account?{" "}
              <span
                className="text-white font-semibold cursor-pointer hover:underline"
                onClick={() => nav("/")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
