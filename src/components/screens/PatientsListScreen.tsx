import { useEffect, useState } from "react";
import { Search, Plus, Eye, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import { apiConfig } from "../../utils/apiConfig";
import Loader from "../ui/Loader";

interface PatientsListScreenProps {
  onNavigate?: (screen: string) => void;
}

interface Patient {
  id: string;
  patient_id: number;
  name: string;
  phone: string;
  gender: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface PatientAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Patient[];
}

export default function PatientsListScreen({ onNavigate }: PatientsListScreenProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  // ============================
  // 🚀 Fetch Patients from API
  // ============================
  const fetchPatients = async (url?: string) => {
    try {
      setLoading(true);
      const response = await axiosClient.get<PatientAPIResponse>(url || apiConfig.patients.list());
      setPatients(response.data.results);
      setTotalCount(response.data.count);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextUrl) {
      setCurrentPage(prev => prev + 1);
      fetchPatients(nextUrl);
    }
  };

  const handlePrevPage = () => {
    if (prevUrl) {
      setCurrentPage(prev => prev - 1);
      fetchPatients(prevUrl);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // ============================
  // 🔍 Search Filter
  // ============================
  const filteredPatients = patients.filter((p) => {
    const text = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(text) ||
      p.phone.toLowerCase().includes(text) ||
      (p.notes && p.notes.toLowerCase().includes(text))
    );
  });

  return (
    <DashboardLayout activeNav="Patients" onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-slate-900 mb-1">Patients</h2>
            <p className="text-slate-600">Manage all patient records</p>
          </div>

          <button
            onClick={() => onNavigate?.("add-patient")}
            className="flex items-center gap-2 bg-[#1F9CA7] text-white px-4 py-2.5 rounded-xl hover:bg-[#178891] transition"
          >
            <Plus size={20} />
            Add Patient
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone..."
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          {loading ? (
            <div className="p-12 flex justify-center"><Loader /></div>
          ) : filteredPatients.length === 0 ? (
            <p className="p-6 text-center text-slate-500">No patients found.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-slate-700">No</th>
                  <th className="px-6 py-4 text-left text-slate-700">Patient ID</th>
                  <th className="px-6 py-4 text-left text-slate-700">Name</th>
                  <th className="px-6 py-4 text-left text-slate-700">Phone</th>
                  <th className="px-6 py-4 text-left text-slate-700">Created At</th>
                  <th className="px-6 py-4 text-left text-slate-700">Notes</th>
                  <th className="px-6 py-4 text-left text-slate-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredPatients.map((patient, index) => (
                  <tr key={patient.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-600">{index + 1}</td>
                    <td className="px-6 py-4 text-slate-600">{patient.patient_id}</td>
                    <td className="px-6 py-4 text-slate-900">{patient.name}</td>
                    <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(patient.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{patient.notes || "-"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigate?.(`patient-profile:${patient.id}`)}
                          className="p-2 text-[#1F9CA7] hover:bg-[#1F9CA7]/10 rounded-lg"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-slate-600">
              Showing {patients.length} of {totalCount} patients
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={!prevUrl}
                className="flex items-center gap-1 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span className="px-3 py-2 text-slate-600">
                Page {currentPage}
              </span>
              <button
                onClick={handleNextPage}
                disabled={!nextUrl}
                className="flex items-center gap-1 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
