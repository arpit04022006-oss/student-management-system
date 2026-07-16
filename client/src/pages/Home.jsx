import { useEffect, useState } from "react";
import { 
  FaPlus, 
  FaSearch, 
  FaUsers, 
  FaBookOpen, 
  FaGraduationCap, 
  FaExclamationTriangle,
  FaTimes
} from "react-icons/fa";
import API from "../services/api";
import Navbar from "../components/Navbar";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";

function Home() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDeleteId, setStudentToDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Client-side search logic
    if (searchQuery.trim() === "") {
      setFilteredStudents(students);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.course.toLowerCase().includes(query) ||
          (student.phone && student.phone.toLowerCase().includes(query)) ||
          student.age.toString().includes(query)
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/students");
      const list = res.data.students || [];
      setStudents(list);
      setFilteredStudents(list);
    } catch (error) {
      console.error("Error fetching students:", error);
      showToast("Failed to fetch students. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Add / Edit form submit handler
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedStudent) {
        // Edit Mode
        const res = await API.put(`/students/${selectedStudent._id}`, formData);
        if (res.data.success) {
          showToast("Student profile updated successfully!");
          fetchStudents();
          setIsFormModalOpen(false);
        }
      } else {
        // Add Mode
        const res = await API.post("/students/add", formData);
        if (res.data.success) {
          showToast("New student added successfully!");
          fetchStudents();
          setIsFormModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving student:", error);
      const errMsg = error.response?.data?.message || "Failed to save student details.";
      showToast(errMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger Delete confirmation modal
  const handleDeleteClick = (id) => {
    setStudentToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    if (!studentToDeleteId) return;
    setIsSubmitting(true);
    try {
      const res = await API.delete(`/students/${studentToDeleteId}`);
      if (res.data.success) {
        showToast("Student record deleted successfully!");
        fetchStudents();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      showToast("Failed to delete student record.", "error");
    } finally {
      setIsSubmitting(false);
      setStudentToDeleteId(null);
    }
  };

  // Trigger Edit modal
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsFormModalOpen(true);
  };

  // Trigger Add modal
  const handleAddClick = () => {
    setSelectedStudent(null);
    setIsFormModalOpen(true);
  };

  // Statistics calculation
  const totalStudents = students.length;
  const distinctCourses = new Set(students.map((s) => s.course.trim())).size;
  const averageAge =
    totalStudents > 0
      ? (students.reduce((sum, s) => sum + s.age, 0) / totalStudents).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-5 right-5 z-50 animate-slide-in">
            <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-semibold transition-all ${
              toast.type === "error"
                ? "bg-rose-50 border-rose-100 text-rose-800"
                : "bg-emerald-50 border-emerald-100 text-emerald-800"
            }`}>
              <span className={`w-2 h-2 rounded-full ${toast.type === "error" ? "bg-rose-500" : "bg-emerald-500"}`}></span>
              <span>{toast.message}</span>
              <button 
                onClick={() => setToast(null)}
                className="ml-2.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FaTimes size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Title & Actions Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Student Directory
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Manage student enrollment details, courses, and registry statistics.
            </p>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-200 transition-all text-sm cursor-pointer"
          >
            <FaPlus size={14} />
            Enroll Student
          </button>
        </div>

        {/* Analytics Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
              <FaUsers size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enrollment</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{isLoading ? "..." : totalStudents}</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
              <FaBookOpen size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Courses</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{isLoading ? "..." : distinctCourses}</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-xl">
              <FaGraduationCap size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Student Age</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{isLoading ? "..." : `${averageAge} yrs`}</h3>
            </div>
          </div>
        </section>

        {/* Directory Controls & Table */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-white/50">
            <div className="relative max-w-md w-full">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FaSearch size={14} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, course, age..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>
          </div>

          <StudentTable
            students={filteredStudents}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            isLoading={isLoading}
          />
        </section>
      </main>

      {/* Add/Edit Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => !isSubmitting && setIsFormModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal content wrapper */}
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative z-10 animate-scale-up">
            <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">
                {selectedStudent ? "Edit Student Profile" : "Register New Student"}
              </h3>
              <button
                disabled={isSubmitting}
                onClick={() => setIsFormModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                <FaTimes size={16} />
              </button>
            </div>
            <div className="p-6">
              <StudentForm
                initialData={selectedStudent}
                onSubmit={handleFormSubmit}
                onCancel={() => setIsFormModalOpen(false)}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => !isSubmitting && setIsDeleteModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal wrapper */}
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative z-10 animate-scale-up p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl shrink-0">
                <FaExclamationTriangle size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800">Delete Student Record?</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Are you sure you want to delete this student record? This action will permanently remove the student from the repository and cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmDelete}
                className="px-4.5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-md shadow-rose-100 transition-all flex items-center gap-2 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;