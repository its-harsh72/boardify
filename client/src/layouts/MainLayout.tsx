import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }: any) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="p-6 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
