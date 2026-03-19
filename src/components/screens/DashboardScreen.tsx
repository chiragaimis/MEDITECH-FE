import { useEffect, useState } from "react";
import { Search, Plus, Eye, Edit } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import { apiConfig } from "../../utils/apiConfig";
import Loader from "../ui/Loader";

interface DashboardScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const [recentPatients, setRecentPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch last 5 patients
  const fetchPatients = async () => {
    try {
      const response = await axiosClient.get(apiConfig.patients.list());
      const data = response.data as any;
      const latest = data.results.slice(0, 5);
      setRecentPatients(latest);
    } catch (error) {
      console.error("Dashboard Patients Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <DashboardLayout activeNav="Dashboard" onNavigate={onNavigate}>
      <div className="space-y-8">

        {/* -------------------------------- */}
        {/* SECTION 1: Knowledge Cards        */}
        {/* -------------------------------- */}
        <div className="grid grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl bg-white shadow-sm border">
            <h3 className="text-slate-900 mb-2 text-lg font-semibold">
              Most Common Issues
            </h3>
            <ul className="text-slate-600 space-y-1 text-base">
              <li>• Headache / Migraine</li>
              <li>• Gastric Issues</li>
              <li>• Stress / Anxiety</li>
              <li>• Joint Pain</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl bg-white shadow-sm border">
            <h3 className="text-slate-900 mb-2 text-lg font-semibold">
              Top Remedies
            </h3>
            <ul className="text-slate-600 space-y-1 text-base">
              <li>• Nux Vomica</li>
              <li>• Belladonna</li>
              <li>• Arsenicum Album</li>
              <li>• Bryonia</li>
            </ul>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* SECTION 2: Quick Search + Add     */}
        {/* -------------------------------- */}
        <div className="grid grid-cols-3 gap-6">

          {/* Quick Search */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <label className="block text-slate-700 mb-3 text-lg font-medium">
              Quick Patient Search
            </label>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or phone..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl
                focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none text-base"
              />
            </div>
          </div>

          {/* Add Patient */}
          <div
            onClick={() => onNavigate?.("add-patient")}
            className="bg-gradient-to-br from-[#1F9CA7] to-[#178891] rounded-sm shadow-sm 
            p-6 text-white cursor-pointer hover:shadow-md transition"
          >
            <div className="p-2 bg-white/20 rounded-lg w-max mb-4">
              <Plus size={25} />
            </div>
            <h3 className="text-xl font-semibold">Add New Patient</h3>
            <p className="text-white/80">Register a new patient</p>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* SECTION 3: Recent Patients Table */}
        {/* -------------------------------- */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-slate-900 font-semibold text-lg">
              Recent Patients
            </h3>
          </div>

          {loading ? (
            <div className="p-12 flex justify-center"><Loader /></div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-slate-700">Name</th>
                  <th className="px-6 py-3 text-left text-slate-700">Phone</th>
                  <th className="px-6 py-3 text-left text-slate-700">Created</th>
                  <th className="px-6 py-3 text-left text-slate-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {recentPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">{patient.name}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {new Date(patient.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            onNavigate?.(`patient-profile:${patient.id}`)
                          }
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
              Showing {recentPatients.length} of total patients
            </p>

            <button
              onClick={() => onNavigate?.("patients")}
              className="text-[#1F9CA7] hover:text-[#178891] font-medium"
            >
              View All Patients →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
