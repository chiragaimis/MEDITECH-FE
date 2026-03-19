import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { apiConfig } from '../../utils/apiConfig';
import Loader from '../ui/Loader';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="w-96">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1F9CA7] rounded-xl mb-4 shadow-sm">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4C16 4 12 8 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 8 16 4 16 4Z" fill="white"/>
              <path d="M16 16C16 16 12 20 12 24C12 26.2091 13.7909 28 16 28C18.2091 28 20 26.2091 20 24C20 20 16 16 16 16Z" fill="white" opacity="0.7"/>
            </svg>
          </div>
          <h2 className="text-slate-900 mb-1">Shivam Homeopathy Clinic</h2>
          <p className="text-slate-600">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-slate-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="admin"
                required
                className={`w-full px-4 py-2.5 border rounded-xl transition-all duration-200 ${
                  emailFocused 
                    ? 'border-[#1F9CA7] ring-2 ring-[#1F9CA7]/20 outline-none' 
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              />
              <p className="mt-1.5 text-slate-500">Enter your username</p>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="Enter your password"
                  required
                  className={`w-full px-4 py-2.5 border rounded-xl transition-all duration-200 pr-12 ${
                    passwordFocused 
                      ? 'border-[#1F9CA7] ring-2 ring-[#1F9CA7]/20 outline-none' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <a 
                href="#" 
                className="text-[#1F9CA7] hover:text-[#178891] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F9CA7] text-white px-4 py-3 rounded-xl shadow-sm hover:bg-[#178891] active:bg-[#146f78] transition-all duration-200 hover:shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-[#1F9CA7] focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader /> Signing In...</> : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-slate-600">
          Need help? <a href="#" className="text-[#1F9CA7] hover:text-[#178891]">Contact Support</a>
        </p>
      </div>
    </div>
  );
}