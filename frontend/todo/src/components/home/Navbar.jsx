import React, { useState } from "react";
import Hamburger from "hamburger-react";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="h-20 relative">
        {/* Desktop Navigation - Hidden on small screens */}
        <div className="hidden sm:block">
          <ul className="flex justify-end">
            <li className="p-2 mx-2 bg-blue-400 rounded-md mt-2 text-center text-white">
              Home
            </li>
            <li className="p-2 mx-2 bg-blue-400 rounded-md mt-2 text-center text-white">
              Profile
            </li>
            <li className="p-2 mx-2 bg-blue-400 rounded-md mt-2 text-center text-white">
              Log out
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <div className="absolute top-4 right-4 z-20 p-2">
            <Hamburger
              toggle={setIsSidebarOpen}
              toggled={isSidebarOpen}
              direction="right"
            />
          </div>

          {/* Sidebar */}
          <div
            className={`
            fixed top-0 right-0 h-full w-64 bg-slate-300 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
            z-10 pt-20
          `}
          >
            <ul className="flex flex-col items-end pr-4">
              <li className="p-2 mx-2 bg-blue-400 rounded-md mt-2 text-center text-white w-48">
                Home
              </li>
              <li className="p-2 mx-2 bg-blue-400 rounded-md mt-2 text-center text-white w-48">
                Profile
              </li>
              <li className="p-2 mx-2 bg-blue-400 rounded-md mt-2 text-center text-white w-48">
                Log out
              </li>
            </ul>
          </div>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black opacity-50 z-5"
            />
          )}
        </div>
      </nav>
    </>
  );
}
