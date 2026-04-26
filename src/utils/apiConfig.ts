import globalConfig from '../../config/Global.json';

class ApiConfig {
  private config = globalConfig;

  get baseUrl(): string {
    return this.config.backend.baseUrl;
  }

  get host(): string {
    return this.config.backend.host;
  }

  // Patient endpoints
  patients = {
    list: () => this.config.endpoints.patients.list,
    create: () => this.config.endpoints.patients.create,
    detail: (id: string) => this.config.endpoints.patients.detail.replace('{id}', id),
    update: (id: string) => this.config.endpoints.patients.update.replace('{id}', id),
    delete: (id: string) => this.config.endpoints.patients.delete.replace('{id}', id)
  };

  // Visit endpoints
  visits = {
    list: () => this.config.endpoints.visits.list,
    create: () => this.config.endpoints.visits.create,
    detail: (id: string) => this.config.endpoints.visits.detail.replace('{id}', id),
    update: (id: string) => this.config.endpoints.visits.update.replace('{id}', id),
    delete: (id: string) => this.config.endpoints.visits.delete.replace('{id}', id),
    byPatient: (patientId: string) => this.config.endpoints.visits.byPatient.replace('{patientId}', patientId)
  };

  // Auth endpoints
  auth = {
    login: () => this.config.endpoints.auth.login,
    logout: () => this.config.endpoints.auth.logout,
    register: () => this.config.endpoints.auth.register,
    profile: () => this.config.endpoints.auth.profile,
    tokenRefresh: () => this.config.endpoints.auth.tokenRefresh
  };

  // Dashboard endpoints
  dashboard = {
    summary: () => this.config.endpoints.dashboard.summary
  };

  // Doctor Profile endpoints
  doctorProfile = {
    me: () => this.config.endpoints.doctorProfile.me,
    update: () => this.config.endpoints.doctorProfile.update
  };
}

export const apiConfig = new ApiConfig();
export default apiConfig;