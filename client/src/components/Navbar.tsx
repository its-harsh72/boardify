// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { api } from "../api/axios";
// import Logo from "@/assets/logo2.png";

// export default function Navbar() {
//   const nav = useNavigate();

//   const handleLogout = async () => {
//     await api.post("/auth/logout");
//     nav("/");
//   };

//   return (
//     <nav
//       className="
//         sticky top-4 z-50 mx-4 
//         h-16 px-6
//         flex items-center justify-between
//         rounded-2xl
//         bg-[#0A1124]/90 
//         backdrop-blur-2xl
//         shadow-[0_8px_30px_rgba(0,0,0,0.45)]
//         border border-white/10
//       "
//     >
//       {/* LEFT SECTION */}
//       <div
//         className="
//           flex items-center gap-3 cursor-pointer
//           transition-all duration-300
//           hover:opacity-90 hover:scale-[1.01]
//         "
//         onClick={() => nav("/dashboard")}
//       >
//         <img
//           src={Logo}
//           alt="Boardify Logo"
//           className="
//             w-10 h-10 rounded-xl 
//             shadow-md 
//             ring-1 ring-white/10
//           "
//         />
//         <h1 className="text-xl font-semibold text-white tracking-wide">
//           Boardify
//         </h1>
//       </div>

//       {/* RIGHT SECTION */}
//       <div className="flex items-center gap-4">
//         <Button
//           variant="ghost"
//           onClick={handleLogout}
//           className="
//             text-white/90
//             border border-white/10
//             rounded-xl px-5 py-2
//             hover:bg-white/10
//             hover:text-white
//             transition-all duration-200
//             shadow-sm
//           "
//         >
//           Logout
//         </Button>
//       </div>
//     </nav>
//   );
// }

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { api } from "../api/axios";
import Logo from "@/assets/logo2.png";
import { LogOut, LayoutDashboard, Settings } from "lucide-react";

export default function Navbar() {
  const nav = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    nav("/");
  };

  return (
    <nav
      className="
        sticky top-4 z-50 mx-4 
        h-16 px-6
        flex items-center justify-between
        rounded-2xl
        bg-white/95 
        backdrop-blur-xl
        shadow-lg
        border border-gray-200/80
        transition-all duration-300
        hover:shadow-xl
      "
    >
      {/* LEFT SECTION - Logo & Brand */}
      <div className="flex items-center gap-4">
        <div
          className="
            flex items-center gap-3 cursor-pointer
            transition-all duration-300
            hover:scale-[1.02] active:scale-[0.98]
            group
          "
          onClick={() => nav("/dashboard")}
        >
          <div className="relative">
            <img
              src={Logo}
              alt="Boardify Logo"
              className="
                w-10 h-10 rounded-xl 
                shadow-sm
                border border-gray-300
                group-hover:shadow-md
                transition-all duration-300
              "
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Boardify
            </h1>
            <p className="text-xs text-gray-500 font-medium">Workspace</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 ml-6">
          <Button
            variant="ghost"
            onClick={() => nav("/dashboard")}
            className="
              text-gray-700
              rounded-lg px-4 py-2
              hover:bg-gray-100
              hover:text-gray-900
              transition-all duration-200
              font-medium
              flex items-center gap-2
            "
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => nav("/settings")}
            className="
              text-gray-700
              rounded-lg px-4 py-2
              hover:bg-gray-100
              hover:text-gray-900
              transition-all duration-200
              font-medium
              flex items-center gap-2
            "
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* RIGHT SECTION - User Actions */}
      <div className="flex items-center gap-3">
        {/* User Info (optional) */}
        <div className="hidden sm:flex items-center gap-3 mr-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">User Name</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="
            text-gray-700
            border border-gray-300
            rounded-xl px-4 py-2
            hover:bg-red-50
            hover:text-red-700
            hover:border-red-200
            bg-white
            transition-all duration-200
            shadow-sm
            hover:shadow-md
            font-medium
            flex items-center gap-2
            group
          "
        >
          <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </nav>
  );
}