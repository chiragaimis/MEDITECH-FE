import axiosClient from './axiosClient';

export interface DoctorProfileResponse {
  name: string;
  email: string;
  phone: string;
  address: string;
  specialization: string;
  experience: string;
  qualification: string;
  registration_no: string;
  about: string;
  profile_image: string | null;
}

export interface DoctorProfilePayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  specialization: string;
  experience: string;
  qualification: string;
  registration_no: string;
  about: string;
  profile_image: string | null;
}

export const doctorProfileApi = {
  getProfile: async (): Promise<DoctorProfileResponse> => {
    const response = await axiosClient.get<DoctorProfileResponse>('doctorProfile/me/');
    return response.data;
  },

  updateProfile: async (data: DoctorProfilePayload): Promise<DoctorProfileResponse> => {
    const response = await axiosClient.put<DoctorProfileResponse>('doctorProfile/me/', data);
    return response.data;
  }
};
