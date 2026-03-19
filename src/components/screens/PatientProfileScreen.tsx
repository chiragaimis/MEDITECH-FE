import { useEffect, useState } from "react";
import { Phone, Calendar, Edit, Plus } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import { apiConfig } from "../../utils/apiConfig";
import Loader from "../ui/Loader";

interface PatientProfileScreenProps {
  onNavigate?: (screen: string) => void;
  screen?: string;
}

export default function PatientProfileScreen({ onNavigate, screen }: PatientProfileScreenProps) {
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Extract patient UUID from route
  const patientId = screen?.includes(":") ? screen.split(":")[1] : null;

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    const fetchPatient = async () => {
      try {
        console.log("Fetching patient:", patientId);

        const response = await axiosClient.get(apiConfig.patients.detail(patientId));
        console.log("API response:", response.data);

        setPatient(response.data);
      } catch (error: any) {
        console.error("Error fetching patient:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  // ---------------------------
  // UI STATES
  // ---------------------------

  if (!patientId) {
    return (
      <DashboardLayout activeNav="Patients" onNavigate={onNavigate}>
        <p className="p-6 text-red-600">Invalid patient ID</p>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout activeNav="Patients" onNavigate={onNavigate}>
        <div className="p-12 flex justify-center"><Loader /></div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout activeNav="Patients" onNavigate={onNavigate}>
        <p className="p-6 text-red-600">Patient not found.</p>
      </DashboardLayout>
    );
  }

  // ---------------------------
  // MAIN PROFILE UI
  // ---------------------------

  return (
    <DashboardLayout activeNav="Patients" onNavigate={onNavigate}>
      <div className="space-y-6">

        {/* Patient Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start justify-between">
            
            {/* Avatar + Info */}
            <div className="flex items-start gap-6">
              
              {/* Avatar (first 2 letters) */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#1F9CA7] to-[#178891] rounded-xl 
                flex items-center justify-center text-white text-3xl uppercase">
                {patient.name.slice(0, 2)}
              </div>

              {/* Patient Info */}
              <div>
                <h2 className="text-slate-900 mb-2">{patient.name}</h2>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={16} />
                    <span>{patient.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-slate-500">Gender:</span>
                    <span>{patient.gender || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-slate-500">Patient ID:</span>
                    <span>#{patient.patient_id}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={16} />
                    <span>
                      Created on: {new Date(patient.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate?.(`add-visit:${patient.id}`)}
                className="flex items-center gap-2 bg-[#1F9CA7] text-white px-4 py-2 rounded-xl hover:bg-[#178891]"
              >
                <Plus size={18} />
                Add Visit
              </button>

              <button
                onClick={() => onNavigate?.(`edit-patient:${patient.id}`)}
                className="flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-slate-900 mb-2">Medical Notes</h3>
            <p className="text-slate-600 leading-relaxed">
              {patient.notes || "No medical notes available."}
            </p>
          </div>
        </div>

        {/* Visit History - Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 text-xl font-semibold">Visit History</h3>
              <span className="bg-[#1F9CA7] text-white px-3 py-1 rounded-full text-sm">
                {patient.visits?.length || 0} visits
              </span>
            </div>
          </div>

          {!patient.visits || patient.visits.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="text-slate-300 mx-auto mb-4" size={48} />
              <p className="text-slate-500">No visits recorded</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-slate-700 font-medium">No</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-medium">Date</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-medium">Diagnosis</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-medium">Symptoms</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-medium">Medicines</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {patient.visits.map((visit: any, index: number) => (
                    <tr key={visit.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 bg-[#1F9CA7] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(visit.visit_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900">{visit.diagnosis}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs">
                        <p className="truncate">{visit.symptoms}</p>
                      </td>
                      <td className="px-6 py-4">
                        {visit.medicines && visit.medicines.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {visit.medicines.slice(0, 2).map((medicine: string, idx: number) => (
                              <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                {medicine}
                              </span>
                            ))}
                            {visit.medicines.length > 2 && (
                              <span className="text-slate-500 text-xs">+{visit.medicines.length - 2} more</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-sm">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs">
                        <p className="truncate">{visit.notes || "No notes"}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
