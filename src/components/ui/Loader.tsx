export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#1F9CA7]/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-[#1F9CA7] rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C16 4 12 8 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 8 16 4 16 4Z" fill="#1F9CA7"/>
            <path d="M16 16C16 16 12 20 12 24C12 26.2091 13.7909 28 16 28C18.2091 28 20 26.2091 20 24C20 20 16 16 16 16Z" fill="#1F9CA7" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer pulse ring */}
          <div className="absolute inset-0 bg-[#1F9CA7]/10 rounded-3xl animate-ping"></div>
          
          {/* Main logo container */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-[#1F9CA7] to-[#178891] rounded-3xl shadow-2xl flex items-center justify-center">
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-3xl border-4 border-transparent border-t-white/30 animate-spin"></div>
            
            {/* Logo */}
            <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
              <path d="M16 4C16 4 12 8 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 8 16 4 16 4Z" fill="white"/>
              <path d="M16 16C16 16 12 20 12 24C12 26.2091 13.7909 28 16 28C18.2091 28 20 26.2091 20 24C20 20 16 16 16 16Z" fill="white" opacity="0.7"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Homeo Clinic</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#1F9CA7] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-[#1F9CA7] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-[#1F9CA7] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
          <p className="text-slate-600 mt-2">Loading your data...</p>
        </div>
      </div>
    </div>
  );
}
