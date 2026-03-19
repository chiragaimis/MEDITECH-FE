import { useState } from "react";
import { Search, Plus, X, AlertCircle, Pill, Sparkles, CheckCircle2 } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import Loader from "../ui/Loader";

interface MedicineResult {
  medicine_id: string;
  medicine_name: string;
  confidence: number;
  description_preview: string;
}

interface ApiResponse {
  input_symptoms: string[];
  results: MedicineResult[];
  total_found: number;
}

export default function MedicineSuggestionScreen({ onNavigate }: any) {
  const [symptoms, setSymptoms] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<ApiResponse | null>(null);

  const addSymptom = () => setSymptoms([...symptoms, ""]);
  
  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const updateSymptom = (index: number, value: string) => {
    const updated = [...symptoms];
    updated[index] = value;
    setSymptoms(updated);
  };

  const handleSearch = async () => {
    const validSymptoms = symptoms.filter(s => s.trim());
    
    if (validSymptoms.length === 0) {
      setError("Please enter at least one symptom");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosClient.post<ApiResponse>(
        "/medicine/suggest/",
        { symptoms: validSymptoms }
      );
      setResults(response.data);
    } catch (err: any) {
      console.error("API Error:", err);
      setError("Failed to fetch suggestions. Please try again or check your session.");
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-emerald-500";
    if (confidence >= 60) return "bg-amber-500";
    return "bg-orange-500";
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return "bg-emerald-50 border-emerald-200";
    if (confidence >= 60) return "bg-amber-50 border-amber-200";
    return "bg-orange-50 border-orange-200";
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 80) return "text-emerald-700";
    if (confidence >= 60) return "text-amber-700";
    return "text-orange-700";
  };

  const getMatchTextBg = (confidence: number) => {
    if (confidence >= 80) return "bg-emerald-100";
    if (confidence >= 60) return "bg-amber-100";
    return "bg-orange-100";
  };

  return (
    <DashboardLayout activeNav="Medicine Suggestion" onNavigate={onNavigate}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#1F9CA7] to-[#178891] rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Pill size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Medicine Suggestion System</h1>
              <p className="text-white/90">AI-powered homeopathic medicine recommendations based on symptoms</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#1F9CA7]/10 rounded-xl flex items-center justify-center">
              <Sparkles className="text-[#1F9CA7]" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Enter Patient Symptoms</h2>
              <p className="text-slate-600 text-sm">Add multiple symptoms for more accurate recommendations</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-10 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <span className="text-slate-700 font-bold">{index + 1}</span>
                </div>
                <input
                  type="text"
                  value={symptom}
                  onChange={(e) => updateSymptom(index, e.target.value)}
                  placeholder={`Enter symptom ${index + 1} (e.g., ${index === 0 ? 'stomach ache' : index === 1 ? 'headache' : 'fever'})`}
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F9CA7] focus:border-[#1F9CA7] outline-none transition-all text-slate-700"
                />
                {symptoms.length > 1 && (
                  <button
                    onClick={() => removeSymptom(index)}
                    className="flex-shrink-0 w-12 h-12 text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addSymptom}
            className="mb-6 flex items-center gap-2 text-[#1F9CA7] hover:bg-[#1F9CA7]/5 font-semibold px-4 py-3 rounded-xl transition-colors border-2 border-dashed border-slate-300 hover:border-[#1F9CA7]"
          >
            <Plus size={20} /> Add Another Symptom
          </button>

          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#1F9CA7] to-[#178891] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 transition-all"
          >
            {loading ? (
              <>
                <Loader />
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Search size={24} />
                Get Medicine Recommendations
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <>
            {/* Analyzed Symptoms */}
            {results.input_symptoms.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="text-[#1F9CA7]" size={24} />
                  <h3 className="text-lg font-bold text-slate-900">Analyzed Symptoms</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {results.input_symptoms.map((symptom, i) => (
                    <span key={i} className="px-5 py-2.5 bg-[#1F9CA7]/10 text-[#1F9CA7] rounded-full font-semibold border-2 border-[#1F9CA7]/20">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Recommended Medicines
                {results.total_found > 0 && (
                  <span className="ml-3 px-4 py-2 bg-[#1F9CA7] text-white rounded-full text-base">{results.total_found}</span>
                )}
              </h2>
            </div>

            {/* Results List */}
            {results.results.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-16 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Pill className="text-slate-400" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">No Medicines Found</h3>
                <p className="text-slate-500 text-lg">Try different or more specific symptoms.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {results.results.map((medicine, idx) => (
                  <div key={medicine.medicine_id} className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#1F9CA7]/50 transition-all">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#1F9CA7] to-[#178891] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{medicine.medicine_name}</h3>
                        <p className="text-slate-600">Homeopathic Medicine</p>
                      </div>
                      <div className={`flex-shrink-0 px-6 py-3 rounded-xl border-2 ${getConfidenceBg(medicine.confidence)}`}>
                        <div className={`text-3xl font-bold ${getConfidenceText(medicine.confidence)}`}>{medicine.confidence}%</div>
                        <div className={`text-xs font-semibold text-center mt-1 px-3 py-1 rounded-md ${getMatchTextBg(medicine.confidence)} ${getConfidenceText(medicine.confidence)}`}>Match</div>
                      </div>
                    </div>
                    
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-600">Confidence Score</span>
                        <span className="text-sm font-bold text-slate-900">{medicine.confidence}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getConfidenceColor(medicine.confidence)} transition-all duration-1000`}
                          style={{ width: `${medicine.confidence}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-700 mb-2">Description</h4>
                      <p className="text-slate-700 leading-relaxed">{medicine.description_preview}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
