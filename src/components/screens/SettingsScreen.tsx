import { useState } from 'react';
import { Plus, Edit, Trash2, RefreshCw, Download, Upload, ExternalLink } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
// import { apiConfig } from '../../utils/apiConfig';

interface SettingsScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [isIndexing, setIsIndexing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const sources = [
    { id: 1, name: 'Kent\'s Repertory', url: 'https://example.com/kents', lastUpdated: '2025-10-15', status: 'Active' },
    { id: 2, name: 'Materia Medica', url: 'https://example.com/materia', lastUpdated: '2025-10-20', status: 'Active' },
    { id: 3, name: 'Boericke\'s Repertory', url: 'https://example.com/boericke', lastUpdated: '2025-09-30', status: 'Active' },
    { id: 4, name: 'Clinical Cases Archive', url: 'https://example.com/cases', lastUpdated: '2025-11-01', status: 'Inactive' },
  ];

  const handleReindex = () => {
    setIsIndexing(true);
    setTimeout(() => setIsIndexing(false), 3000);
  };

  return (
    <DashboardLayout activeNav="Settings" onNavigate={onNavigate}>
      <div className="w-full space-y-8">
        {/* Page Header */}
        <div>
          <h2 className="text-slate-900 mb-1">Settings</h2>
          <p className="text-slate-600">Manage system configuration and data sources</p>
        </div>

        {/* Source Management */}
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-slate-900 mb-0.5">Data Sources</h3>
                <p className="text-slate-600">Manage homeopathic reference sources</p>
              </div>
              <button className="flex items-center gap-2 bg-[#1F9CA7] text-white px-4 py-2 rounded-xl hover:bg-[#178891] transition-all">
                <Plus size={18} />
                <span>Add Source</span>
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {sources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-slate-900">{source.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-sm ${
                          source.status === 'Active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {source.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-600">
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-[#1F9CA7] transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>{source.url}</span>
                        </a>
                        <span className="text-slate-400">•</span>
                        <span>Updated {source.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Re-indexing */}
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900 mb-1">Re-index Database</h3>
                <p className="text-slate-600">Update the search index with latest source data</p>
              </div>
              <button
                onClick={handleReindex}
                disabled={isIndexing}
                className="flex items-center gap-2 bg-[#FF7A66] text-white px-4 py-2 rounded-xl hover:bg-[#ff6b55] transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <RefreshCw size={18} className={isIndexing ? 'animate-spin' : ''} />
                <span>{isIndexing ? 'Indexing...' : 'Re-index Now'}</span>
              </button>
            </div>

            {/* Loading Indicator */}
            {isIndexing && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Processing sources...</span>
                  <span>47%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FF7A66] to-[#ff6b55] rounded-full transition-all duration-300" style={{ width: '47%' }}></div>
                </div>
                <p className="text-slate-500">Indexing Kent's Repertory... (2 of 4 sources)</p>
              </div>
            )}

            {!isIndexing && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-green-600 flex-shrink-0 mt-0.5">
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z" fill="currentColor"/>
                </svg>
                <div>
                  <p className="text-green-800">Last indexed: November 10, 2025 at 3:45 PM</p>
                  <p className="text-green-600 mt-0.5">All sources up to date</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Theme Settings */}
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-4">Appearance</h3>
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <div className="text-slate-900 mb-0.5">Dark Mode</div>
                <p className="text-slate-600">Toggle dark theme for better visibility at night</p>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  isDarkMode ? 'bg-[#1F9CA7]' : 'bg-slate-300'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isDarkMode ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Backup & Export */}
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-4">Data Management</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 p-4 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all text-slate-700">
                <Download size={20} />
                <span>Export Data</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all text-slate-700">
                <Upload size={20} />
                <span>Import Data</span>
              </button>
            </div>
            <p className="text-slate-500 mt-3">
              Export patient records and visit history, or import data from backup files
            </p>
          </div>
        </section>

        {/* Error State Example */}
        <section>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-red-600 flex-shrink-0 mt-0.5">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
            </svg>
            <div>
              <p className="text-red-800">Unable to fetch source data</p>
              <p className="text-red-600 mt-0.5">Connection to "Clinical Cases Archive" failed. Check network connection.</p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
