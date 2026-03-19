import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PatientsListScreen from '../screens/PatientsListScreen';
import AddPatientScreen from '../screens/AddPatientScreen';
import AddVisitScreen from '../screens/AddVisitScreen';
import SymptomSearchScreen from '../screens/SymptomSearchScreen';
import ResultsScreen from '../screens/ResultsScreen';
import PatientProfileScreen from '../screens/PatientProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default function DesignPage() {
  return (
    <div className="space-y-16">
      <div>
        <div className="mb-6">
          <h2 className="text-[#1F9CA7] mb-2">All Application Screens</h2>
          <p className="text-slate-600">
            Desktop-first UI with clean, medical, trustworthy design. Soft teal primary, coral accent, generous white space.
          </p>
        </div>
      </div>

      {/* Screen 1: Login */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 1: Login</h3>
          <p className="text-slate-600">Email, password, forgot link, sign-in button with all states</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <LoginScreen onLogin={() => {}} />
        </div>
      </section>

      {/* Screen 2: Dashboard */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 2: Dashboard</h3>
          <p className="text-slate-600">Header, left navigation, recent patients, stats widgets, quick search</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <DashboardScreen onNavigate={() => {}} />
        </div>
      </section>

      {/* Screen 3: Patients List */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 3: Patients List</h3>
          <p className="text-slate-600">Search bar + table with actions (view, edit)</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <PatientsListScreen onNavigate={() => {}} />
        </div>
      </section>

      {/* Screen 4: Add Patient */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 4: Add Patient Form</h3>
          <p className="text-slate-600">Name, phone, DOB datepicker, notes with validation</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <AddPatientScreen onNavigate={() => {}} />
        </div>
      </section>

      {/* Screen 5: Add Visit */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 5: Add Visit Form</h3>
          <p className="text-slate-600">Select patient, visit date, diagnosis, symptoms, medicines (tag input)</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <AddVisitScreen onNavigate={() => {}} />
        </div>
      </section>

      {/* Screen 6: Symptom Search */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 6: Symptom Search</h3>
          <p className="text-slate-600">Large textarea, search button, optional source checkboxes</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <SymptomSearchScreen onNavigate={() => {}} />
        </div>
      </section>

      {/* Screen 7: Results */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 7: Results Screen</h3>
          <p className="text-slate-600">Top-ranked medicines (left) + matching remedy entries (right) with detail panel</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <ResultsScreen onNavigate={() => {}} />
        </div>
      </section>

      {/* Screen 8: Patient Profile */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 8: Patient Profile</h3>
          <p className="text-slate-600">Patient header card + visit timeline with modal</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <PatientProfileScreen onNavigate={() => {}} />
        </div>
      </section>

      {/* Screen 9: Settings */}
      <section>
        <div className="mb-4 pb-3 border-b border-slate-200">
          <h3 className="text-slate-900">Screen 9: Settings</h3>
          <p className="text-slate-600">Manage sources, re-index, theme toggle, backup/export</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <SettingsScreen onNavigate={() => {}} />
        </div>
      </section>
    </div>
  );
}
