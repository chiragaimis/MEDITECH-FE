import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Database, Plus, Search, BookOpen, AlertCircle, CheckCircle2, Edit2, Trash2, X } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import Global from "../../../config/Global.json";
import { toast } from "sonner";

interface Medicine {
  id?: string;
  medicine_name: string;
  full_description: string;
  dose?: string;
}

export default function ResultsScreen({ onNavigate }: any) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [doseFilter, setDoseFilter] = useState("");
  const [newMedicine, setNewMedicine] = useState<Medicine>({
    medicine_name: "",
    full_description: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string | null; name: string }>({ show: false, id: null, name: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchMedicines(1, searchQuery, doseFilter);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, doseFilter]);

  useEffect(() => {
    fetchMedicines(currentPage, searchQuery, doseFilter);
  }, [currentPage]);

  const fetchMedicines = async (page = 1, search = "", dose = "") => {
    setLoading(true);
    try {
      const params: Record<string, any> = { page };
      if (search.trim()) params.search = search.trim();
      if (dose.trim()) params.dose = dose.trim();
      const response = await axiosClient.get(Global.endpoints.medicine.list, { params });
      const data: any = response.data;
      setMedicines(Array.isArray(data.results) ? data.results : []);
      setTotalCount(data.count || 0);
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = async () => {
    if (!newMedicine.medicine_name.trim() || !newMedicine.full_description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (editingId) {
        await axiosClient.put(`/medicine/${editingId}/`, newMedicine);
        toast.success("Medicine updated successfully!");
        setEditingId(null);
      } else {
        await axiosClient.post(Global.endpoints.medicine.create, newMedicine);
        toast.success("Medicine added successfully!");
      }
      setNewMedicine({ medicine_name: "", full_description: "" });
      setShowAddForm(false);
      fetchMedicines(currentPage);
    } catch (err) {
      toast.error(editingId ? "Failed to update medicine." : "Failed to add medicine.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (medicine: Medicine) => {
    setNewMedicine({
      medicine_name: medicine.medicine_name,
      full_description: medicine.full_description
    });
    setEditingId(medicine.id || null);
    setShowAddForm(true);
    setError("");
  };

  const handleDeleteClick = (medicine: Medicine) => {
    setDeleteConfirm({ show: true, id: medicine.id || null, name: medicine.medicine_name });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setLoading(true);
    try {
      await axiosClient.delete(`/medicine/${deleteConfirm.id}/`);
      toast.success("Medicine deleted successfully!");
      fetchMedicines(currentPage);
      setDeleteConfirm({ show: false, id: null, name: "" });
    } catch (err) {
      toast.error("Failed to delete medicine.");
    } finally {
      setLoading(false);
    }
  };

  const filteredMedicines = Array.isArray(medicines) ? medicines : [];

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      {showAddForm && createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1F9CA7]/10 rounded-xl flex items-center justify-center">
                  <Plus className="text-[#1F9CA7]" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{editingId ? "Edit Medicine" : "Add New Medicine"}</h2>
                  <p className="text-slate-500 text-sm">Enter medicine details</p>
                </div>
              </div>
              <button
                onClick={() => { setShowAddForm(false); setError(""); setEditingId(null); setNewMedicine({ medicine_name: "", full_description: "" }); }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Medicine Name</label>
                <input
                  type="text"
                  value={newMedicine.medicine_name}
                  onChange={(e) => setNewMedicine({ ...newMedicine, medicine_name: e.target.value })}
                  placeholder="e.g., DAMIANA"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F9CA7] focus:border-[#1F9CA7] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description</label>
                <textarea
                  rows={6}
                  value={newMedicine.full_description}
                  onChange={(e) => setNewMedicine({ ...newMedicine, full_description: e.target.value })}
                  placeholder="Enter detailed description of the medicine..."
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F9CA7] focus:border-[#1F9CA7] outline-none transition-all resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleAddMedicine}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#1F9CA7] to-[#178891] text-white py-3 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 transition-all"
              >
                {loading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Medicine" : "Add Medicine")}
              </button>
              <button
                onClick={() => { setShowAddForm(false); setError(""); setEditingId(null); setNewMedicine({ medicine_name: "", full_description: "" }); }}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
      {deleteConfirm.show && createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Delete Medicine</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete <span className="font-bold text-slate-900">{deleteConfirm.name}</span>? This action cannot be undone.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDeleteConfirm}
                disabled={loading}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 transition-all"
              >
                {loading ? "Deleting..." : "Delete Medicine"}
              </button>
              <button
                onClick={() => setDeleteConfirm({ show: false, id: null, name: "" })}
                className="w-full px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
      <DashboardLayout activeNav="Sources" onNavigate={onNavigate}>
        <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1F9CA7] to-[#178891] rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Database size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Medicine Database</h1>
                <p className="text-white/90">Manage homeopathic medicine sources</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-white text-[#1F9CA7] px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all flex items-center gap-2"
            >
              <Plus size={20} />
              Add Medicine
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <CheckCircle2 className="text-green-500" size={20} />
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <Search className="text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or description..."
              className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F9CA7] focus:border-[#1F9CA7] outline-none transition-all"
            />
            <input
              type="text"
              value={doseFilter}
              onChange={(e) => setDoseFilter(e.target.value)}
              placeholder="Filter by dose (e.g. 3x)"
              className="w-52 px-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F9CA7] focus:border-[#1F9CA7] outline-none transition-all"
            />
          </div>
        </div>

        {/* Medicines List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              All Medicines
              <span className="ml-3 px-4 py-1 bg-[#1F9CA7] text-white rounded-full text-base">{totalCount}</span>
            </h2>
          </div>

          {loading && !showAddForm ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-16 text-center">
              <div className="w-16 h-16 border-4 border-[#1F9CA7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading medicines...</p>
            </div>
          ) : filteredMedicines.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-16 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-slate-400" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No Medicines Found</h3>
              <p className="text-slate-500 text-lg">Add your first medicine to get started.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#1F9CA7] to-[#178891] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">#</th>
                      <th className="px-6 py-4 text-left font-bold">Medicine Name</th>
                      <th className="px-6 py-4 text-left font-bold">Description</th>
                      <th className="px-6 py-4 text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedicines.map((medicine, idx) => (
                      <tr key={medicine.id || idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#1F9CA7] to-[#178891] rounded-lg flex items-center justify-center text-white font-bold">
                            {(currentPage - 1) * PAGE_SIZE + idx + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 text-lg">{medicine.medicine_name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-700 text-sm leading-relaxed max-w-3xl">
                            {medicine.full_description.length > 200 
                              ? `${medicine.full_description.substring(0, 200)}...` 
                              : medicine.full_description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(medicine)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(medicine)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    Page {currentPage} of {totalPages} &mdash; {totalCount} total
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1 || loading}
                      className="px-4 py-2 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-all"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                      .reduce<(number | string)[]>((acc, p, i, arr) => {
                        if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, i) =>
                        p === "..." ? (
                          <span key={`ellipsis-${i}`} className="px-2 text-slate-400">...</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p as number)}
                            disabled={loading}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                              currentPage === p
                                ? "bg-[#1F9CA7] text-white"
                                : "border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || loading}
                      className="px-4 py-2 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </DashboardLayout>
    </>
  );
}
