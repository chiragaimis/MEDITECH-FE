import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit, X, Camera, CheckCircle, AlertCircle, Briefcase, GraduationCap, FileText, Trash2, UserCircle, Calendar, Clock, Star, Shield, Award } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Loader from '../ui/Loader';
import { doctorProfileApi } from '../../api/doctorProfile';

interface DoctorProfileScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function DoctorProfileScreen({ onNavigate }: DoctorProfileScreenProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [doctorData, setDoctorData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    experience: '',
    qualification: '',
    registrationNo: '',
    about: ''
  });
  const [editData, setEditData] = useState(doctorData);
  const [editImage, setEditImage] = useState<string | null>(profileImage);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await doctorProfileApi.getProfile();
      const mappedData = {
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        specialization: data.specialization || '',
        experience: data.experience || '',
        qualification: data.qualification || '',
        registrationNo: data.registration_no || '',
        about: data.about || ''
      };
      setDoctorData(mappedData);
      setEditData(mappedData);
      setProfileImage(data.profile_image || null);
      setEditImage(data.profile_image || null);
    } catch (error: any) {
      if (error.response?.status !== 404) {
        showNotification('error', 'Failed to load profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        address: editData.address,
        specialization: editData.specialization,
        experience: editData.experience,
        qualification: editData.qualification,
        registration_no: editData.registrationNo,
        about: editData.about,
        profile_image: editImage
      };
      const data = await doctorProfileApi.updateProfile(payload);
      const mappedData = {
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        specialization: data.specialization || '',
        experience: data.experience || '',
        qualification: data.qualification || '',
        registrationNo: data.registration_no || '',
        about: data.about || ''
      };
      setDoctorData(mappedData);
      setProfileImage(data.profile_image || null);
      setShowEditModal(false);
      showNotification('success', 'Profile updated successfully!');
    } catch (error: any) {
      showNotification('error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(doctorData);
    setEditImage(profileImage);
    setShowEditModal(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setEditImage(null);
  };

  return (
    <DashboardLayout activeNav="Profile" onNavigate={onNavigate}>
      {notification && (
        <div className="fixed top-4 right-4 z-[10000]">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border-2 ${
            notification.type === 'success' 
              ? 'bg-white border-emerald-500 text-emerald-700' 
              : 'bg-white border-red-500 text-red-700'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle size={20} className="text-emerald-500" />
            ) : (
              <AlertCircle size={20} className="text-red-500" />
            )}
            <span className="font-semibold">{notification.message}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-96"><Loader /></div>
      ) : (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Doctor Profile</h1>
              <p className="text-slate-500 mt-1">Manage your professional information</p>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1F9CA7] text-white rounded-lg hover:bg-[#178891] transition-colors"
            >
              <Edit size={18} />
              Edit Profile
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Cover */}
            <div className="h-32 bg-gradient-to-r from-[#1F9CA7] to-[#178891]"></div>
            
            {/* Profile Info */}
            <div className="px-8 pb-8">
              <div className="flex items-end gap-6 -mt-16 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-xl overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1F9CA7] to-[#178891] flex items-center justify-center">
                        <UserCircle className="text-white" size={64} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 pb-2">
                  <h2 className="text-3xl font-bold text-slate-800">{doctorData.name || 'Doctor Name'}</h2>
                  <p className="text-lg text-[#1F9CA7] font-semibold mt-1">{doctorData.specialization || 'Specialization'}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Briefcase className="text-white" size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 font-semibold mb-1">EXPERIENCE</p>
                  <p className="text-xl font-bold text-blue-900">{doctorData.experience || 'N/A'}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-white" size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 font-semibold mb-1">QUALIFICATION</p>
                  <p className="text-lg font-bold text-purple-900">{doctorData.qualification?.split(',')[0] || 'N/A'}</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-emerald-600 font-semibold mb-1">PHONE</p>
                  <p className="text-lg font-bold text-emerald-900">{doctorData.phone || 'N/A'}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <FileText className="text-white" size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-orange-600 font-semibold mb-1">REG. NO</p>
                  <p className="text-sm font-bold text-orange-900">{doctorData.registrationNo || 'N/A'}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Contact Information</h3>
                  
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Mail className="text-[#1F9CA7] mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">EMAIL</p>
                      <p className="text-slate-800 font-medium">{doctorData.email || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Phone className="text-[#1F9CA7] mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">PHONE</p>
                      <p className="text-slate-800 font-medium">{doctorData.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <MapPin className="text-[#1F9CA7] mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">ADDRESS</p>
                      <p className="text-slate-800 font-medium">{doctorData.address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Professional Details</h3>
                  
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 font-semibold mb-1">SPECIALIZATION</p>
                    <p className="text-slate-800 font-medium">{doctorData.specialization || 'Not provided'}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 font-semibold mb-1">QUALIFICATION</p>
                    <p className="text-slate-800 font-medium">{doctorData.qualification || 'Not provided'}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 font-semibold mb-1">EXPERIENCE</p>
                    <p className="text-slate-800 font-medium">{doctorData.experience || 'Not provided'}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 font-semibold mb-1">REGISTRATION NO</p>
                    <p className="text-slate-800 font-medium">{doctorData.registrationNo || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="mt-6 p-5 bg-gradient-to-br from-[#1F9CA7]/5 to-[#178891]/5 rounded-xl border border-[#1F9CA7]/20">
                <h3 className="text-lg font-bold text-slate-800 mb-3">About</h3>
                <p className="text-slate-700 leading-relaxed">{doctorData.about || 'No information provided.'}</p>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
              <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] shadow-2xl flex flex-col">
                {/* Header with Gradient */}
                <div className="relative bg-gradient-to-r from-[#1F9CA7] to-[#178891] px-6 py-4 rounded-t-3xl flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                      <p className="text-white/80 text-xs mt-0.5">Update your professional information</p>
                    </div>
                    <button 
                      onClick={handleCancel} 
                      className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                    >
                      <X size={20} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Content - Landscape Layout */}
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-6 p-6">
                    {/* Left Column - Profile & Personal */}
                    <div className="space-y-5">
                      {/* Profile Image */}
                      <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative group mb-3">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                              {editImage ? (
                                <img src={editImage} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#1F9CA7] to-[#178891] flex items-center justify-center">
                                  <User className="text-white" size={36} />
                                </div>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="profile-upload"
                            />
                            <label
                              htmlFor="profile-upload"
                              className="absolute -bottom-1 -right-1 w-9 h-9 bg-[#1F9CA7] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#178891] shadow-lg transition-all hover:scale-110"
                            >
                              <Camera className="text-white" size={16} />
                            </label>
                            {editImage && (
                              <button
                                onClick={handleDeleteImage}
                                className="absolute -top-1 -right-1 w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center hover:bg-red-600 shadow-lg transition-all hover:scale-110"
                              >
                                <Trash2 className="text-white" size={16} />
                              </button>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 mb-1">Profile Picture</h4>
                          <p className="text-xs text-slate-500">Click camera to upload</p>
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div>
                        <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <User size={18} className="text-[#1F9CA7]" />
                          Personal Info
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                            <input
                              type="text"
                              value={editData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Dr. John Doe"
                              className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email *</label>
                            <input
                              type="email"
                              value={editData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="doctor@example.com"
                              className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone *</label>
                            <input
                              type="tel"
                              value={editData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+91 98765 43210"
                              className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registration No</label>
                            <input
                              type="text"
                              value={editData.registrationNo}
                              onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                              placeholder="MH-HOM-12345"
                              className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column - Professional */}
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Briefcase size={18} className="text-[#1F9CA7]" />
                          Professional Details
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Specialization *</label>
                            <input
                              type="text"
                              value={editData.specialization}
                              onChange={(e) => handleInputChange('specialization', e.target.value)}
                              placeholder="Classical Homeopathy"
                              className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Experience</label>
                            <input
                              type="text"
                              value={editData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              placeholder="10+ Years"
                              className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Qualification</label>
                            <input
                              type="text"
                              value={editData.qualification}
                              onChange={(e) => handleInputChange('qualification', e.target.value)}
                              placeholder="BHMS, MD (Homeopathy)"
                              className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <MapPin size={18} className="text-[#1F9CA7]" />
                          Location
                        </h4>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Clinic Address</label>
                          <textarea
                            value={editData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            rows={4}
                            placeholder="Enter your clinic address"
                            className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none resize-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column - About */}
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <FileText size={18} className="text-[#1F9CA7]" />
                          About / Bio
                        </h4>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tell us about yourself</label>
                          <textarea
                            value={editData.about}
                            onChange={(e) => handleInputChange('about', e.target.value)}
                            rows={16}
                            placeholder="Share your experience, expertise, approach to treatment, and what makes your practice unique..."
                            className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none resize-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-slate-100 bg-slate-50 rounded-b-3xl flex-shrink-0">
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2 text-sm text-slate-700 font-semibold bg-white border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-2 text-sm bg-gradient-to-r from-[#1F9CA7] to-[#178891] text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                  >
                    {saving ? (
                      <>
                        <Loader />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
