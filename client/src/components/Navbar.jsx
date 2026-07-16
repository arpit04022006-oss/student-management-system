import React from "react";
import { FaGraduationCap } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-200 animate-bounce-subtle">
            <FaGraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent">
              Academix
            </h1>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              Student Management System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-700 animate-pulse-slow">Admin Control</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
