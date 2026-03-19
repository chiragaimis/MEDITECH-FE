import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosClient from "../../api/axiosClient";
import { apiConfig } from "../../utils/apiConfig";
import Loader from "../ui/Loader";

interface AddPatientScreenProps {
  onNavigate?: (screen: string) => void;
  screen?: string;
}

export default function AddPatientScreen({ onNavigate }: AddPatientScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    notes: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any | null>(null);

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });

    if (field === "name" && !formData.name) {
      setErrors({ ...errors, name: "Patient name is required" });
    } else if (field === "phone" && !formData.phone) {
      setErrors({ ...errors, phone: "Phone number is required" });
    } else if (
      field === "phone" &&
      formData.phone &&
      !/^\+?\d{10,}$/.test(formData.phone.replace(/[\s-]/g, ""))
    ) {
      setErrors({ ...errors, phone: "Please enter a valid phone number" });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setErrors({
        name: !formData.name ? "Patient name is required" : "",
        phone: !formData.phone ? "Phone number is required" : "",
      });
      return;
    }

    setLoading(true);
    setSuccessData(null);

    try {
      const response = await axiosClient.post(apiConfig.patients.create(), formData);

      setSuccessData(response.data);

      setFormData({
        name: "",
        phone: "",
        gender: "",
        notes: "",
      });

      setTimeout(() => {
        onNavigate?.("patient");
      }, 1500);
    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.phone) {
        setErrors((prev) => ({
          ...prev,
          phone: error.response.data.phone[0],
        }));
      } else {
        alert("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeNav="Patient" onNavigate={onNavigate}>
      <div className="w-full">
        <div className="space-y-6">
          <div>
            <h2 className="text-slate-900 mb-1">Add New Patient</h2>
            <p className="text-slate-600">Register a new patient in the system</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-slate-700 mb-2">
                  Full Name <span className="text-[#FF7A66]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={`w-full px-4 py-2.5 border rounded-xl ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="Enter patient's full name"
                />
                {touched.name && errors.name && (
                  <p className="text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-slate-700 mb-2">
                  Phone Number <span className="text-[#FF7A66]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full px-4 py-2.5 border rounded-xl ${
                    touched.phone && errors.phone
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="9876543210"
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-slate-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                  placeholder="Additional notes..."
                />
              </div>

              {/* Success */}
              {successData && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-800">Patient saved successfully!</p>
                  <p className="text-green-600 mt-1">
                    Patient ID: #{successData.patient_id}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1F9CA7] text-white px-6 py-2.5 rounded-xl hover:bg-[#178891] flex items-center gap-2"
                >
                  {loading ? <><Loader /> Saving...</> : "Save Patient"}
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate?.("patients")}
                  className="border border-slate-300 px-6 py-2.5 rounded-xl"
                >
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
