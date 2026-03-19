import { useState } from 'react';
import { Search, Plus, Edit, Trash2, ExternalLink, ChevronRight, ChevronDown, User, Settings, Eye, X, Calendar } from 'lucide-react';

export default function ComponentsPage() {
  const [tagInputValue, setTagInputValue] = useState('');
  const [tags, setTags] = useState(['Arnica Montana', 'Belladonna']);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-[#1F9CA7] mb-2">Component Library</h2>
        <p className="text-slate-600">
          Complete set of reusable components with all interaction states
        </p>
      </div>

      {/* Buttons */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Buttons</h3>
        <div className="space-y-6">
          {/* Primary Buttons */}
          <div>
            <p className="text-slate-700 mb-3">Primary Button</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-[#1F9CA7] text-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#178891] transition-all">
                Default
              </button>
              <button className="bg-[#1F9CA7] text-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#178891] hover:shadow-md transition-all">
                Hover
              </button>
              <button className="bg-[#1F9CA7] text-white px-4 py-2.5 rounded-xl shadow-sm ring-2 ring-[#1F9CA7] ring-offset-2">
                Focus
              </button>
              <button className="bg-[#146f78] text-white px-4 py-2.5 rounded-xl shadow-sm">
                Active
              </button>
              <button disabled className="bg-slate-300 text-slate-500 px-4 py-2.5 rounded-xl cursor-not-allowed">
                Disabled
              </button>
              <button className="bg-[#1F9CA7] text-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#178891] transition-all flex items-center gap-2">
                <Plus size={18} />
                <span>With Icon</span>
              </button>
            </div>
            <div className="mt-3 bg-slate-100 rounded-lg p-3">
              <code className="text-slate-800">bg-[#1F9CA7] text-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#178891]</code>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <p className="text-slate-700 mb-3">Secondary Button (Outline)</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all">
                Default
              </button>
              <button className="border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl bg-slate-50">
                Hover
              </button>
              <button className="border-2 border-slate-400 text-slate-700 px-4 py-2.5 rounded-xl ring-2 ring-slate-300 ring-offset-2">
                Focus
              </button>
              <button disabled className="border border-slate-200 text-slate-400 px-4 py-2.5 rounded-xl cursor-not-allowed">
                Disabled
              </button>
            </div>
            <div className="mt-3 bg-slate-100 rounded-lg p-3">
              <code className="text-slate-800">border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50</code>
            </div>
          </div>

          {/* Ghost Buttons */}
          <div>
            <p className="text-slate-700 mb-3">Ghost Button</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-all">
                Default
              </button>
              <button className="text-slate-700 px-4 py-2.5 rounded-xl bg-slate-100">
                Hover
              </button>
              <button className="text-[#1F9CA7] px-4 py-2.5 rounded-xl hover:bg-[#1F9CA7]/10 transition-all">
                Primary Color
              </button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div>
            <p className="text-slate-700 mb-3">Icon Buttons</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="p-2 text-[#1F9CA7] hover:bg-[#1F9CA7]/10 rounded-lg transition-colors">
                <Eye size={18} />
              </button>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Edit size={18} />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
              <button disabled className="p-2 text-slate-300 cursor-not-allowed rounded-lg">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Form Inputs</h3>
        <div className="space-y-6 max-w-2xl">
          {/* Text Input */}
          <div>
            <label className="block text-slate-700 mb-2">Text Input</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl hover:border-slate-400 focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
            />
            <p className="mt-1.5 text-slate-500">Helper text for the input field</p>
            <div className="mt-3 bg-slate-100 rounded-lg p-3">
              <code className="text-slate-800">border border-slate-300 rounded-xl hover:border-slate-400 focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20</code>
            </div>
          </div>

          {/* Text Input with Error */}
          <div>
            <label className="block text-slate-700 mb-2">Input with Error</label>
            <input
              type="text"
              placeholder="Invalid input..."
              className="w-full px-4 py-2.5 border border-red-500 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
            />
            <p className="mt-1.5 text-red-600 flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm1 10H7V9h2v2zm0-3H7V5h2v3z"/>
              </svg>
              This field is required
            </p>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-slate-700 mb-2">Textarea</label>
            <textarea
              rows={4}
              placeholder="Enter detailed description..."
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl hover:border-slate-400 focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all resize-none"
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-slate-700 mb-2">Date Picker</label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl hover:border-slate-400 focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all pr-12"
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Dropdown */}
          <div>
            <label className="block text-slate-700 mb-2">Dropdown Select</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-slate-300 rounded-xl hover:border-slate-400 focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all appearance-none bg-white">
                <option>Select an option...</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Checkbox */}
          <div>
            <label className="block text-slate-700 mb-3">Checkboxes</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F9CA7]/20 transition-all cursor-pointer"
                  />
                  <svg
                    className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.5 4L6 11.5L2.5 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-slate-700 group-hover:text-slate-900">Checked</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F9CA7]/20 transition-all cursor-pointer"
                  />
                  <svg
                    className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.5 4L6 11.5L2.5 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-slate-700 group-hover:text-slate-900">Unchecked</span>
              </label>
            </div>
          </div>

          {/* Radio Buttons */}
          <div>
            <label className="block text-slate-700 mb-3">Radio Buttons</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="radio-example"
                  defaultChecked
                  className="w-5 h-5 border-2 border-slate-300 appearance-none rounded-full checked:bg-[#1F9CA7] checked:border-[#1F9CA7] checked:shadow-[inset_0_0_0_3px_white] hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F9CA7]/20 transition-all cursor-pointer"
                />
                <span className="text-slate-700 group-hover:text-slate-900">Option 1</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="radio-example"
                  className="w-5 h-5 border-2 border-slate-300 appearance-none rounded-full checked:bg-[#1F9CA7] checked:border-[#1F9CA7] checked:shadow-[inset_0_0_0_3px_white] hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F9CA7]/20 transition-all cursor-pointer"
                />
                <span className="text-slate-700 group-hover:text-slate-900">Option 2</span>
              </label>
            </div>
          </div>

          {/* Tag Input */}
          <div>
            <label className="block text-slate-700 mb-2">Tag Input</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-[#1F9CA7]/10 text-[#1F9CA7] px-3 py-1.5 rounded-lg"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="hover:bg-[#1F9CA7]/20 rounded p-0.5 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInputValue}
                onChange={(e) => setTagInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && tagInputValue.trim()) {
                    setTags([...tags, tagInputValue.trim()]);
                    setTagInputValue('');
                  }
                }}
                placeholder="Type and press Enter"
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl hover:border-slate-400 focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20 outline-none transition-all"
              />
              <button
                onClick={() => {
                  if (tagInputValue.trim()) {
                    setTags([...tags, tagInputValue.trim()]);
                    setTagInputValue('');
                  }
                }}
                className="bg-[#1F9CA7] text-white px-6 py-2.5 rounded-xl hover:bg-[#178891] transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Cards</h3>
        <div className="grid grid-cols-3 gap-6">
          {/* Small Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-slate-900 mb-2">Small Card</h3>
            <p className="text-slate-600">Basic card with hover effect and 12px border radius</p>
          </div>

          {/* Medium Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-slate-900">Medium Card</h3>
              <button className="text-slate-400 hover:text-slate-600">
                <Settings size={20} />
              </button>
            </div>
            <p className="text-slate-600 mb-4">Card with header actions</p>
            <button className="w-full bg-[#1F9CA7] text-white px-4 py-2 rounded-xl hover:bg-[#178891] transition-all">
              Action
            </button>
          </div>

          {/* Metrics Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-[#1F9CA7]/10 rounded-lg">
                <User className="text-[#1F9CA7]" size={24} />
              </div>
              <span className="text-green-600 flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L8 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>12%</span>
              </span>
            </div>
            <p className="text-slate-600 mb-1">Metric Label</p>
            <h3 className="text-slate-900">1,247</h3>
          </div>
        </div>
        <div className="mt-3 bg-slate-100 rounded-lg p-3">
          <code className="text-slate-800">bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md</code>
        </div>
      </section>

      {/* Tables */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Table</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-slate-700">Name</th>
                <th className="px-6 py-3 text-left text-slate-700">Status</th>
                <th className="px-6 py-3 text-left text-slate-700">Date</th>
                <th className="px-6 py-3 text-left text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-900">John Doe</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">Active</span>
                </td>
                <td className="px-6 py-4 text-slate-600">2025-11-16</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#1F9CA7] hover:bg-[#1F9CA7]/10 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-900">Jane Smith</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">Inactive</span>
                </td>
                <td className="px-6 py-4 text-slate-600">2025-11-15</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#1F9CA7] hover:bg-[#1F9CA7]/10 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Icons */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Icons (Lucide React)</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-8 gap-6">
            <div className="flex flex-col items-center gap-2">
              <Search className="text-slate-700" size={24} />
              <span className="text-slate-600">Search</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Plus className="text-slate-700" size={24} />
              <span className="text-slate-600">Plus</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Edit className="text-slate-700" size={24} />
              <span className="text-slate-600">Edit</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Trash2 className="text-slate-700" size={24} />
              <span className="text-slate-600">Delete</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ExternalLink className="text-slate-700" size={24} />
              <span className="text-slate-600">External</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ChevronRight className="text-slate-700" size={24} />
              <span className="text-slate-600">Chevron</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <User className="text-slate-700" size={24} />
              <span className="text-slate-600">User</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Settings className="text-slate-700" size={24} />
              <span className="text-slate-600">Settings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Toast Notifications</h3>
        <div className="space-y-4 max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-green-600 flex-shrink-0 mt-0.5">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z" fill="currentColor"/>
            </svg>
            <div>
              <p className="text-green-800">Patient saved successfully!</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-blue-600 flex-shrink-0 mt-0.5">
              <circle cx="10" cy="10" r="10"/>
              <path d="M9 5h2v6H9V5zm0 8h2v2H9v-2z" fill="white"/>
            </svg>
            <div>
              <p className="text-blue-800">Indexing completed</p>
              <p className="text-blue-600 mt-0.5">All sources updated successfully</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-red-600 flex-shrink-0 mt-0.5">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
            </svg>
            <div>
              <p className="text-red-800">Unable to fetch source data</p>
              <p className="text-red-600 mt-0.5">Connection failed. Please try again.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Empty States */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Empty States</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4">
            <User className="text-slate-400" size={32} />
          </div>
          <h3 className="text-slate-900 mb-2">No patients found</h3>
          <p className="text-slate-600 mb-6">Add your first patient to get started</p>
          <button className="bg-[#1F9CA7] text-white px-6 py-2.5 rounded-xl hover:bg-[#178891] transition-all">
            Add Patient
          </button>
        </div>
      </section>
    </div>
  );
}
