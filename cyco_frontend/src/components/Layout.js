import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full p-6 min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
}
