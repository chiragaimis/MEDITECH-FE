import { useEffect, useState } from "react";
import { Users, Activity, FlaskConical, Plus, Eye, CalendarDays, Stethoscope, TrendingUp } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import Global from "../../../config/Global.json";
import Loader from "../ui/Loader";

interface DashboardData {
  stats: {
    total_patients: number;
    total_visits: number;
    total_medicines: number;
  };
  recent_visits: {
    visit_id: string;
    patient_name: string;
    patient_id: number;
    visit_date: string;
    diagnosis: string;
    symptoms: string;
  }[];
  top_medicines: {
    medicine: string;
    count: number;
  }[];
}

export default function DashboardScreen({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosClient.get<DashboardData>(Global.endpoints.dashboard.summary);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const stats = [
    { label: "Total Patients", value: data?.stats.total_patients ?? 0, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Total Visits", value: data?.stats.total_visits ?? 0, icon: Activity, color: "bg-teal-50 text-[#1F9CA7]" },
    { label: "Total Medicines", value: data?.stats.total_medicines ?? 0, icon: FlaskConical, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <DashboardLayout activeNav="Dashboard" onNavigate={onNavigate}>
      <div className="space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={26} />
              </div>
              <div>
                <p className="text-slate-500 text-sm">{label}</p>
                {loading ? (
                  <div className="h-8 w-12 bg-slate-100 animate-pulse rounded mt-1" />
                ) : (
                  <p className="text-3xl font-bold text-slate-900">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* Recent Visits */}
          <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} className="text-[#1F9CA7]" />
                <h3 className="font-semibold text-slate-900">Recent Visits</h3>
              </div>
              <button
                onClick={() => onNavigate?.("patients")}
                className="text-sm text-[#1F9CA7] hover:text-[#178891] font-medium"
              >
                View All →
              </button>
            </div>

            {loading ? (
              <div className="p-12 flex justify-center"><Loader /></div>
            ) : data?.recent_visits.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No recent visits</div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm text-slate-600 font-semibold">Patient</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600 font-semibold">Diagnosis</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600 font-semibold">Date</th>
                    <th className="px-6 py-3 text-center text-sm text-slate-600 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data?.recent_visits.map((visit) => (
                    <tr key={visit.visit_id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{visit.patient_name}</div>
                        <div className="text-xs text-slate-400">ID: {visit.patient_id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Stethoscope size={14} className="text-slate-400" />
                          <span className="text-slate-700 text-sm">{visit.diagnosis || "—"}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 truncate max-w-[180px]">{visit.symptoms}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(visit.visit_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => onNavigate?.(`patient-profile:${visit.visit_id}`)}
                          className="p-2 text-[#1F9CA7] hover:bg-[#1F9CA7]/10 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">

            {/* Add Patient CTA */}
            <div
              onClick={() => onNavigate?.("add-patient")}
              className="bg-gradient-to-br from-[#1F9CA7] to-[#178891] rounded-2xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Plus size={22} />
              </div>
              <h3 className="text-lg font-bold">Add New Patient</h3>
              <p className="text-white/75 text-sm mt-1">Register a new patient record</p>
            </div>

            {/* Top Medicines */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                <TrendingUp size={18} className="text-[#1F9CA7]" />
                <h3 className="font-semibold text-slate-900">Top Medicines</h3>
              </div>
              {loading ? (
                <div className="p-8 flex justify-center"><Loader /></div>
              ) : data?.top_medicines.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">No data</div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {data?.top_medicines.map(({ medicine, count }, i) => (
                    <li key={i} className="px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1F9CA7]/10 text-[#1F9CA7] text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-800 font-medium">{medicine}</span>
                      </div>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-semibold">
                        {count}x
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
