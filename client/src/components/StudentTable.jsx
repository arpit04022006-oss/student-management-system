import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function StudentTable({ students, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="animate-spin h-10 w-10 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-slate-500 font-medium text-sm">Loading records...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider bg-slate-50/70">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Contact Details</th>
            <th className="px-6 py-4">Course</th>
            <th className="px-6 py-4 text-center">Age</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {students.length > 0 ? (
            students.map((student) => {
              // Generate a soft random bg color for the avatar based on name initials
              const initials = student.name
                ? student.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
                : "ST";
              
              return (
                <tr
                  key={student._id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/50 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{student.name}</div>
                        <div className="text-xs text-slate-400">ID: {student._id.slice(-8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <div className="text-slate-600 font-medium">{student.email}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{student.phone || "No phone listed"}</div>
                  </td>
                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100/60">
                      {student.course}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-center whitespace-nowrap text-slate-600 font-medium">
                    {student.age}
                  </td>
                  <td className="px-6 py-4.5 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2.5">
                      <button
                        onClick={() => onEdit(student)}
                        aria-label="Edit student"
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(student._id)}
                        aria-label="Delete student"
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-16 text-slate-500">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="font-semibold text-slate-700">No students found</p>
                  <p className="text-xs text-slate-400 mt-1">Try matching criteria or add a new student record.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
