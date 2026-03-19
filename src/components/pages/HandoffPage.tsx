export default function HandoffPage() {
  const componentNames = [
    { name: 'LoginScreen.jsx', description: 'Login page with email/password form', tailwind: 'bg-white rounded-xl shadow-md border border-slate-200 p-8' },
    { name: 'DashboardLayout.jsx', description: 'Main layout with left sidebar navigation', tailwind: 'w-64 bg-white border-r border-slate-200' },
    { name: 'PatientList.jsx', description: 'Patients table with search and pagination', tailwind: 'bg-white rounded-xl shadow-sm border border-slate-200' },
    { name: 'AddPatientForm.jsx', description: 'Form for creating new patient', tailwind: 'space-y-6 max-w-3xl' },
    { name: 'AddVisitForm.jsx', description: 'Form for recording patient visit', tailwind: 'space-y-6 max-w-3xl' },
    { name: 'SymptomSearch.jsx', description: 'Large textarea for symptom input with source selection', tailwind: 'bg-white rounded-xl shadow-sm border border-slate-200 p-8' },
    { name: 'ResultsList.jsx', description: 'Two-column layout with medicines and remedy entries', tailwind: 'grid grid-cols-3 gap-6' },
    { name: 'ResultItem.jsx', description: 'Individual remedy entry card', tailwind: 'bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md' },
    { name: 'MedicineCard.jsx', description: 'Top medicine match with score bar', tailwind: 'space-y-4' },
    { name: 'PatientProfile.jsx', description: 'Patient details with visit timeline', tailwind: 'space-y-6' },
    { name: 'VisitCard.jsx', description: 'Visit timeline item with symptoms and medicines', tailwind: 'bg-white rounded-xl shadow-sm border border-slate-200 p-6' },
    { name: 'VisitModal.jsx', description: 'Full visit details modal', tailwind: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
    { name: 'SettingsPage.jsx', description: 'Settings with source management and indexing', tailwind: 'max-w-5xl space-y-8' },
    { name: 'SourceList.jsx', description: 'List of data sources with edit/delete actions', tailwind: 'space-y-3' },
    { name: 'StatsCard.jsx', description: 'Metric widget with icon and trend', tailwind: 'bg-white rounded-xl shadow-sm border border-slate-200 p-6' },
    { name: 'TagInput.jsx', description: 'Tag input component for medicines', tailwind: 'flex flex-wrap gap-2' },
  ];

  const responsiveNotes = [
    {
      breakpoint: 'Desktop (1024px+)',
      behavior: 'Full left sidebar navigation (64px width), two-column result layouts, spacious cards with 24px gaps'
    },
    {
      breakpoint: 'Tablet (768px - 1023px)',
      behavior: 'Sidebar collapses to icon-only view (48px width), single-column layouts, reduced spacing to 16px'
    },
    {
      breakpoint: 'Mobile (< 768px)',
      behavior: 'Sidebar becomes bottom navigation bar, modals become full-screen, tables become cards, touch-friendly targets (44px min)'
    },
  ];

  const microcopy = [
    {
      category: 'Empty States',
      examples: [
        '"No patients found. Add your first patient."',
        '"No visits recorded yet. Start by adding a visit."',
        '"No results found. Try adjusting your search criteria."',
        '"No sources configured. Add a data source to begin."'
      ]
    },
    {
      category: 'Form Helper Text',
      examples: [
        '"Enter patient\'s full legal name"',
        '"Primary contact number"',
        '"Patient\'s date of birth"',
        '"Optional: Medical history, allergies, or special notes"',
        '"Detailed description of symptoms and their characteristics"',
        '"Add homeopathic remedies prescribed"'
      ]
    },
    {
      category: 'Success Messages',
      examples: [
        '"Patient saved successfully!"',
        '"Visit recorded successfully"',
        '"Source added successfully"',
        '"Indexing completed"',
        '"Settings updated"',
        '"Data exported successfully"'
      ]
    },
    {
      category: 'Error Messages',
      examples: [
        '"Unable to fetch source data"',
        '"Connection failed. Please try again."',
        '"This field is required"',
        '"Please enter a valid phone number"',
        '"Please enter a valid email address"',
        '"Failed to save. Please check your connection."'
      ]
    },
    {
      category: 'Loading States',
      examples: [
        '"Loading patients..."',
        '"Searching remedies..."',
        '"Indexing sources..."',
        '"Processing... 47%"',
        '"Saving changes..."'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-[#1F9CA7] mb-2">Developer Handoff</h2>
        <p className="text-slate-600">
          Complete guide for implementing the design in React + Tailwind
        </p>
      </div>

      {/* Component Names & Structure */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Suggested Component Structure</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <p className="text-slate-700">Recommended file structure and component names</p>
          </div>
          <div className="divide-y divide-slate-200">
            {componentNames.map((component, index) => (
              <div key={index} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <code className="text-[#1F9CA7] mb-1 block">{component.name}</code>
                    <p className="text-slate-600">{component.description}</p>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                  <code className="text-green-400 text-sm">{component.tailwind}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tailwind Class Patterns */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Common Tailwind Patterns</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-3">Primary Button</h3>
            <div className="bg-slate-900 rounded-lg p-4">
              <code className="text-green-400 block mb-2">
                className="bg-[#1F9CA7] text-white px-4 py-2.5 rounded-xl shadow-sm
              </code>
              <code className="text-green-400 block mb-2">
                &nbsp;&nbsp;hover:bg-[#178891] hover:shadow-md
              </code>
              <code className="text-green-400 block mb-2">
                &nbsp;&nbsp;focus:outline-none focus:ring-2 focus:ring-[#1F9CA7] focus:ring-offset-2
              </code>
              <code className="text-green-400 block">
                &nbsp;&nbsp;disabled:bg-slate-300 disabled:cursor-not-allowed
              </code>
              <code className="text-green-400 block">
                &nbsp;&nbsp;transition-all duration-200"
              </code>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-3">Text Input</h3>
            <div className="bg-slate-900 rounded-lg p-4">
              <code className="text-green-400 block mb-2">
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl
              </code>
              <code className="text-green-400 block mb-2">
                &nbsp;&nbsp;hover:border-slate-400
              </code>
              <code className="text-green-400 block mb-2">
                &nbsp;&nbsp;focus:border-[#1F9CA7] focus:ring-2 focus:ring-[#1F9CA7]/20
              </code>
              <code className="text-green-400 block">
                &nbsp;&nbsp;outline-none transition-all"
              </code>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-3">Card</h3>
            <div className="bg-slate-900 rounded-lg p-4">
              <code className="text-green-400 block mb-2">
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6
              </code>
              <code className="text-green-400 block">
                &nbsp;&nbsp;hover:shadow-md transition-shadow"
              </code>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-3">Table Row</h3>
            <div className="bg-slate-900 rounded-lg p-4">
              <code className="text-green-400 block">
                className="hover:bg-slate-50 transition-colors"
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Behavior */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Responsive Design Notes</h3>
        <div className="space-y-4">
          {responsiveNotes.map((note, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="px-3 py-1 bg-[#1F9CA7] text-white rounded-lg">
                  {note.breakpoint.split(' ')[0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-2">{note.breakpoint}</h3>
                  <p className="text-slate-600">{note.behavior}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-900">
            <strong>Implementation Tip:</strong> Use Tailwind responsive prefixes: <code className="px-1.5 py-0.5 bg-white rounded">md:</code> for tablet, <code className="px-1.5 py-0.5 bg-white rounded">lg:</code> for desktop
          </p>
        </div>
      </section>

      {/* Microcopy */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Microcopy & Content</h3>
        <div className="space-y-6">
          {microcopy.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-slate-900 mb-4">{section.category}</h3>
              <ul className="space-y-2">
                {section.examples.map((example, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#1F9CA7] mt-1">→</span>
                    <code className="text-slate-700 bg-slate-50 px-2 py-1 rounded">{example}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Icon SVG Exports */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Icon Library</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-slate-600 mb-4">
            All icons are from <strong>lucide-react</strong> package. Install with:
          </p>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <code className="text-green-400">npm install lucide-react</code>
          </div>
          <p className="text-slate-600 mb-4">Import icons as needed:</p>
          <div className="bg-slate-900 rounded-lg p-4">
            <code className="text-green-400 block mb-1">
              import &#123; Search, Plus, Edit, Trash2, Eye, Calendar,
            </code>
            <code className="text-green-400 block mb-1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User, Settings, ChevronDown, ChevronRight,
            </code>
            <code className="text-green-400 block mb-1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ExternalLink, X, RefreshCw &#125; from 'lucide-react';
            </code>
          </div>
        </div>
      </section>

      {/* Logo SVG */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Logo SVG</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-[#1F9CA7] rounded-xl flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C16 4 12 8 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 8 16 4 16 4Z" fill="white"/>
                <path d="M16 16C16 16 12 20 12 24C12 26.2091 13.7909 28 16 28C18.2091 28 20 26.2091 20 24C20 20 16 16 16 16Z" fill="white" opacity="0.7"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-2">Homeopathy Droplet Logo</h3>
              <p className="text-slate-600">Simple, medical icon representing homeopathic remedy drops</p>
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M16 4C16 4 12 8 12 12C12 14.2091 13.7909 16 16 16
           C18.2091 16 20 14.2091 20 12C20 8 16 4 16 4Z" 
        fill="white"/>
  <path d="M16 16C16 16 12 20 12 24C12 26.2091 13.7909 28 16 28
           C18.2091 28 20 26.2091 20 24C20 20 16 16 16 16Z" 
        fill="white" opacity="0.7"/>
</svg>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Implementation Checklist */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Implementation Checklist</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer"
                  readOnly
                />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Install Tailwind CSS v4.0 and configure</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" defaultChecked className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer" readOnly />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Add Inter (headings) and Roboto (body) fonts</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" defaultChecked className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer" readOnly />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Install lucide-react for icons</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer" readOnly />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Implement responsive breakpoints (md: 768px, lg: 1024px)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer" readOnly />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Test all hover, focus, disabled states on interactive elements</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer" readOnly />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Verify WCAG AA contrast compliance</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer" readOnly />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Add form validation with error states</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer" readOnly />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Implement loading states with progress indicators</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer w-5 h-5 border-2 border-slate-300 rounded appearance-none checked:bg-[#1F9CA7] checked:border-[#1F9CA7] cursor-pointer" readOnly />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-slate-700">Add empty states with appropriate messaging</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final Notes */}
      <section>
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-8">
          <h3 className="text-slate-900 mb-4">Design System Notes</h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-[#1F9CA7] mt-1">✓</span>
              <span>All colors, spacing, and typography follow a consistent token system</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F9CA7] mt-1">✓</span>
              <span>12px border radius (rounded-xl) is the default for all cards, buttons, and inputs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F9CA7] mt-1">✓</span>
              <span>Generous white space with 24px default gaps between components</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F9CA7] mt-1">✓</span>
              <span>All interactive elements have hover, focus, and disabled states</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F9CA7] mt-1">✓</span>
              <span>Transitions are smooth (200ms) for better user experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F9CA7] mt-1">✓</span>
              <span>Design is accessible with WCAG AA compliant contrast ratios</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F9CA7] mt-1">✓</span>
              <span>Medical-appropriate color palette: trustworthy teal, calm coral, neutral greys</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
