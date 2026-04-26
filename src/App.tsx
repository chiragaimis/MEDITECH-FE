import { useState, useEffect } from 'react';
import DashboardScreen from './components/screens/DashboardScreen';
import PatientsListScreen from './components/screens/PatientsListScreen';
import AddPatientScreen from './components/screens/AddPatientScreen';
import PatientProfileScreen from './components/screens/PatientProfileScreen';
import AddVisitScreen from './components/screens/AddVisitScreen';
import ResultsScreen from './components/screens/ResultsScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import DoctorProfileScreen from './components/screens/DoctorProfileScreen';
import LoginScreen from './components/screens/LoginScreen';
import MedicineSuggestionScreen from './components/screens/MedicineSuggestionScreen';
import { FullPageLoader } from './components/ui/Loader';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('currentScreen') || 'dashboard';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('access');
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setIsLoggedIn(false);
    };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const navigate = (screen: string) => {
    setCurrentScreen(screen);
    localStorage.setItem('currentScreen', screen);
  };

  const renderScreen = () => {
    // 🟢 Extract main route (before :)
    const mainScreen = currentScreen.split(':')[0];

    switch (mainScreen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={navigate} />;

      case 'patients':
        return <PatientsListScreen onNavigate={navigate} />;

      case 'add-patient':
        return <AddPatientScreen onNavigate={navigate} />;

      case 'patient-profile':
        return (
          <PatientProfileScreen 
            screen={currentScreen} 
            onNavigate={navigate} 
          />
        );

      case 'add-visit':
        return (
          <AddVisitScreen
            screen={currentScreen}
            onNavigate={navigate}
          />
        );

      case 'edit-patient':
        return (
          <AddPatientScreen 
            screen={currentScreen}
            onNavigate={navigate}
          />
        );

      case 'symptom-search':
      case 'medicine-suggestion':
        return <MedicineSuggestionScreen onNavigate={navigate} />;

      case 'results':
        return <ResultsScreen onNavigate={navigate} />;

      case 'settings':
        return <SettingsScreen onNavigate={navigate} />;

      case 'doctor-profile':
        return <DoctorProfileScreen onNavigate={navigate} />;

      default:
        return <DashboardScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="bg-slate-50">
      {renderScreen()}
    </div>
  );
}
