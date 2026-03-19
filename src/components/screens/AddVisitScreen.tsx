import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, X, ChevronDown } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import { apiConfig } from "../../utils/apiConfig";
import Loader from "../ui/Loader";

interface AddVisitScreenProps {
  onNavigate?: (screen: string) => void;
  screen?: string; // expected: add-visit:<patientId>
}

export default function AddVisitScreen({ onNavigate, screen }: AddVisitScreenProps) {
  // Extract patient UUID from route
  const patientId = screen?.includes(":") ? screen.split(":")[1] : "";
  console.log("AddVisitScreen - patientId:", patientId, "screen:", screen);

  const [patients, setPatients] = useState<any[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [visitDate, setVisitDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");

  const [medicines, setMedicines] = useState<string[]>([]);
  const [newMedicine, setNewMedicine] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(patientId || "");

  const addMedicine = () => {
    if (newMedicine.trim()) {
      setMedicines([...medicines, newMedicine.trim()]);
      setNewMedicine("");
    }
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  // --------------------------
  // Fetch Patients for Dropdown
  // --------------------------
  const fetchPatients = async () => {
    try {
      console.log("Fetching patients...");
      const response = await axiosClient.get(apiConfig.patients.list());
      console.log("Patients response:", response.data);
      setPatients((response.data as any).results);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoadingPatients(false);
    }
  };

  useEffect(() => {
    fetchPatients();

    // Auto-set today's date
    setVisitDate(new Date().toISOString().slice(0, 10));
  }, []);

  // --------------------------
  // SUBMIT VISIT TO BACKEND
  // --------------------------

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (!visitDate || !diagnosis || !symptoms) {
      alert("Please fill required fields!");
      return;
    }

    const payload = {
      patient: selectedPatient,
      visit_date: visitDate,
      diagnosis,
      symptoms,
      medicines,
      notes,
    };
    console.log("Visit payload:", payload);

    try {
      setSubmitting(true);
      console.log("Sending visit to backend...");
      const response = await axiosClient.post(apiConfig.visits.create(), payload);

      console.log("Visit created successfully:", response.data);

      alert("Visit saved successfully!");

      // Redirect back to patient profile
      onNavigate?.(`patient-profile:${selectedPatient}`);
    } catch (error: any) {
      console.error("Visit Create Error:", error.response?.data || error);
      alert("Failed to save visit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout activeNav="Visits" onNavigate={onNavigate}>
      <div className="w-full">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h2 className="text-slate-900 mb-1">Add New Visit</h2>
            <p className="text-slate-600">Record a new patient visit and treatment</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Select Patient */}
              <div>
                <label className="block text-slate-700 mb-2">
                  Select Patient <span className="text-[#FF7A66]">*</span>
                </label>

                <div className="relative">
                  <select
                    value={selectedPatient}
                    onChange={(e) => {
                      console.log("Patient selected:", e.target.value);
                      setSelectedPatient(e.target.value);
                    }}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="">Choose a patient...</option>

                    {!loadingPatients &&
                      patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} - {p.phone}
                        </option>
                      ))}
                  </select>

                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                </div>
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-slate-700 mb-2">Visit Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl pr-12"
                  />
                  <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                </div>
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-slate-700 mb-2">Diagnosis *</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g., Migraine, Anxiety"
                  className="w-full px-4 py-2.5 border rounded-xl"
                />
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-slate-700 mb-2">Symptoms *</label>
                <textarea
                  rows={6}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-xl"
                  placeholder="Describe symptoms..."
                />
              </div>

              {/* Medicines */}
              <div>
                <label className="block text-slate-700 mb-2">Medicines</label>

                {/* Added Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {medicines.map((m, i) => (
                    <div key={i} className="flex items-center bg-[#1F9CA7]/10 text-[#1F9CA7] px-3 py-1.5 rounded-lg">
                      <span>{m}</span>
                      <button type="button" onClick={() => removeMedicine(i)} className="ml-2">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Input */}
                <div className="flex gap-2">
                  <input
                    value={newMedicine}
                    onChange={(e) => setNewMedicine(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addMedicine();
                      }
                    }}
                    placeholder="Type medicine name..."
                    className="flex-1 px-4 py-2.5 border rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={addMedicine}
                    className="bg-[#1F9CA7] text-white px-6 py-2.5 rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-700 mb-2">Additional Notes</label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional notes..."
                  className="w-full px-4 py-2.5 border rounded-xl"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <button type="submit" disabled={submitting}
                  className="bg-[#1F9CA7] text-white px-6 py-2.5 rounded-xl flex items-center gap-2">
                  {submitting ? <><Loader /> Saving...</> : "Save Visit"}
                </button>

                <button type="button" onClick={() => onNavigate?.("dashboard")}
                  className="border px-6 py-2.5 rounded-xl">
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
