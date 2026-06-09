import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212]">

      <Sidebar />

      <div className="ml-72 flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1800px] mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default Layout;