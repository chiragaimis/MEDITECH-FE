import { useEffect, useState, useRef } from "react";
import { Calendar as CalendarIcon, X, Search } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import { apiConfig } from "../../utils/apiConfig";
import Loader from "../ui/Loader";
import { toast } from "sonner";

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
  const [patientSearch, setPatientSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredPatients = patients.filter((p) =>
    `${p.name} ${p.phone}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setVisitDate(new Date().toISOString().slice(0, 10));
  }, []);

  // Auto-set patient name once patients are loaded
  useEffect(() => {
    if (patientId && patients.length > 0) {
      const found = patients.find((p) => p.id === patientId);
      if (found) setSelectedPatientName(`${found.name}${found.phone ? ` - ${found.phone}` : ""}`);
    }
  }, [patients, patientId]);

  // --------------------------
  // SUBMIT VISIT TO BACKEND
  // --------------------------

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!selectedPatient) {
      toast.error("Please select a patient");
      return;
    }
    if (!visitDate || !diagnosis || !symptoms) {
      toast.error("Please fill required fields!");
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

      toast.success("Visit saved successfully!");
      onNavigate?.(`patient-profile:${selectedPatient}`);
    } catch (error: any) {
      console.error("Visit Create Error:", error.response?.data || error);
      toast.error("Failed to save visit");
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

                <div className="relative" ref={dropdownRef}>
                  {/* Search Input */}
                  <div
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl flex items-center gap-2 cursor-pointer bg-white"
                    onClick={() => setShowDropdown(true)}
                  >
                    <Search size={18} className="text-slate-400 flex-shrink-0" />
                    {selectedPatient ? (
                      <span className="flex-1 text-slate-800">{selectedPatientName}</span>
                    ) : (
                      <input
                        type="text"
                        value={patientSearch}
                        onChange={(e) => { setPatientSearch(e.target.value); setShowDropdown(true); }}
                        placeholder="Search patient by name or phone..."
                        className="flex-1 outline-none bg-transparent text-slate-700 placeholder-slate-400"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                    {selectedPatient && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedPatient(""); setSelectedPatientName(""); setPatientSearch(""); setShowDropdown(true); }}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Dropdown List */}
                  {showDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <input
                          type="text"
                          value={patientSearch}
                          onChange={(e) => setPatientSearch(e.target.value)}
                          placeholder="Type to search..."
                          className="w-full outline-none text-sm text-slate-700 placeholder-slate-400"
                          autoFocus
                        />
                      </div>
                      {loadingPatients ? (
                        <div className="flex justify-center py-4"><Loader /></div>
                      ) : filteredPatients.length === 0 ? (
                        <div className="px-4 py-3 text-slate-500 text-sm">No patients found</div>
                      ) : (
                        filteredPatients.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => { setSelectedPatient(p.id); setSelectedPatientName(`${p.name} - ${p.phone}`); setShowDropdown(false); setPatientSearch(""); }}
                            className="px-4 py-3 hover:bg-[#1F9CA7]/10 cursor-pointer flex items-center gap-3 border-b border-slate-50 last:border-0"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#1F9CA7]/20 flex items-center justify-center text-[#1F9CA7] font-semibold text-sm flex-shrink-0">
                              {p.name?.[0]?.toUpperCase()}
                            </div>
                            <div>
                              <p className="text-slate-800 font-medium text-sm">{p.name}</p>
                              <p className="text-slate-500 text-xs">{p.phone}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
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
