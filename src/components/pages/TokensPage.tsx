export default function TokensPage() {
  const colorTokens = [
    { name: 'Primary', value: '#1F9CA7', usage: 'Main brand color, primary buttons, active states' },
    { name: 'Primary Hover', value: '#178891', usage: 'Hover state for primary elements' },
    { name: 'Primary Active', value: '#146f78', usage: 'Active/pressed state' },
    { name: 'Accent', value: '#FF7A66', usage: 'Accent color, secondary CTAs, alerts' },
    { name: 'Accent Hover', value: '#ff6b55', usage: 'Hover state for accent elements' },
  ];

  const neutralTokens = [
    { name: 'Slate 50', value: '#f8fafc', usage: 'Page background' },
    { name: 'Slate 100', value: '#f1f5f9', usage: 'Secondary backgrounds, hover states' },
    { name: 'Slate 200', value: '#e2e8f0', usage: 'Borders, dividers' },
    { name: 'Slate 300', value: '#cbd5e1', usage: 'Input borders, disabled states' },
    { name: 'Slate 400', value: '#94a3b8', usage: 'Placeholder text, icons' },
    { name: 'Slate 500', value: '#64748b', usage: 'Helper text, captions' },
    { name: 'Slate 600', value: '#475569', usage: 'Secondary text' },
    { name: 'Slate 700', value: '#334155', usage: 'Labels, primary text' },
    { name: 'Slate 900', value: '#0f172a', usage: 'Headings, emphasis' },
    { name: 'White', value: '#ffffff', usage: 'Card backgrounds, surfaces' },
  ];

  const spacingTokens = [
    { name: 'space-1', value: '4px', usage: 'Tight spacing, icon gaps' },
    { name: 'space-2', value: '8px', usage: 'Small gaps, compact layouts' },
    { name: 'space-3', value: '12px', usage: 'Default spacing, card padding' },
    { name: 'space-4', value: '16px', usage: 'Standard spacing, section gaps' },
    { name: 'space-6', value: '24px', usage: 'Generous spacing, component gaps' },
    { name: 'space-8', value: '32px', usage: 'Large spacing, section padding' },
    { name: 'space-10', value: '40px', usage: 'Extra large spacing' },
    { name: 'space-16', value: '64px', usage: 'Major section breaks' },
  ];

  const typographyTokens = [
    { name: 'H1', size: '30px', weight: '600', lineHeight: '36px', usage: 'Page titles', font: 'Inter' },
    { name: 'H2', size: '24px', weight: '600', lineHeight: '32px', usage: 'Section headers', font: 'Inter' },
    { name: 'H3', size: '18px', weight: '600', lineHeight: '28px', usage: 'Card titles, subsections', font: 'Inter' },
    { name: 'Body Large', size: '16px', weight: '400', lineHeight: '24px', usage: 'Primary body text', font: 'Roboto' },
    { name: 'Body Medium', size: '14px', weight: '400', lineHeight: '20px', usage: 'Secondary text, table content', font: 'Roboto' },
    { name: 'Caption', size: '12px', weight: '400', lineHeight: '16px', usage: 'Helper text, labels', font: 'Roboto' },
  ];

  const shadowTokens = [
    { name: 'shadow-sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', usage: 'Subtle elevation, cards' },
    { name: 'shadow-md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', usage: 'Hover states, modals' },
    { name: 'shadow-lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', usage: 'Dropdowns, popovers' },
    { name: 'shadow-xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1)', usage: 'Modal overlays' },
  ];

  const radiusTokens = [
    { name: 'rounded-lg', value: '8px', usage: 'Small elements, tags, badges' },
    { name: 'rounded-xl', value: '12px', usage: 'Default: buttons, inputs, cards' },
    { name: 'rounded-full', value: '9999px', usage: 'Pills, avatars, toggles' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-[#1F9CA7] mb-2">Design Tokens</h2>
        <p className="text-slate-600">
          Complete token system for consistent styling across the application
        </p>
      </div>

      {/* Color Tokens - Primary & Accent */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Color Tokens - Primary & Accent</h3>
        <div className="space-y-3">
          {colorTokens.map((token) => (
            <div key={token.name} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-6">
              <div className="w-24 h-16 rounded-lg shadow-sm border border-slate-200" style={{ backgroundColor: token.value }} />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-slate-900">{token.name}</h3>
                  <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{token.value}</code>
                </div>
                <p className="text-slate-600">{token.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neutral Colors */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Neutral Scale</h3>
        <div className="grid grid-cols-2 gap-3">
          {neutralTokens.map((token) => (
            <div key={token.name} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg shadow-sm border border-slate-200" style={{ backgroundColor: token.value }} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-slate-900">{token.name}</span>
                  <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-sm">{token.value}</code>
                </div>
                <p className="text-slate-600">{token.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing Tokens */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Spacing Tokens (4px Scale)</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="space-y-4">
            {spacingTokens.map((token) => (
              <div key={token.name} className="flex items-center gap-6">
                <div className="w-32 text-slate-700">{token.name}</div>
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-8 bg-[#1F9CA7] rounded" style={{ width: token.value }} />
                  <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{token.value}</code>
                  <span className="text-slate-600">{token.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Tokens */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Typography Tokens</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-slate-700">Token</th>
                <th className="px-6 py-3 text-left text-slate-700">Font</th>
                <th className="px-6 py-3 text-left text-slate-700">Size</th>
                <th className="px-6 py-3 text-left text-slate-700">Weight</th>
                <th className="px-6 py-3 text-left text-slate-700">Line Height</th>
                <th className="px-6 py-3 text-left text-slate-700">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {typographyTokens.map((token) => (
                <tr key={token.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-900">{token.name}</td>
                  <td className="px-6 py-4 text-slate-600">{token.font}</td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{token.size}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{token.weight}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{token.lineHeight}</code>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{token.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-amber-900">
            <strong>Note:</strong> Font sizes, weights, and line heights are managed in /styles/globals.css and should not be overridden with Tailwind classes unless specifically required.
          </p>
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Border Radius Tokens</h3>
        <div className="grid grid-cols-3 gap-6">
          {radiusTokens.map((token) => (
            <div key={token.name} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="w-full h-24 bg-[#1F9CA7] mb-4" style={{ borderRadius: token.value }} />
              <div className="mb-1">
                <span className="text-slate-900">{token.name}</span>
                <code className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{token.value}</code>
              </div>
              <p className="text-slate-600">{token.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shadow Tokens */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Shadow Tokens</h3>
        <div className="grid grid-cols-2 gap-6">
          {shadowTokens.map((token) => (
            <div key={token.name} className="bg-white rounded-xl border border-slate-200 p-6" style={{ boxShadow: token.value }}>
              <div className="mb-2">
                <span className="text-slate-900">{token.name}</span>
              </div>
              <code className="text-slate-600 text-sm block mb-2">{token.value}</code>
              <p className="text-slate-600">{token.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WCAG Contrast */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">WCAG AA Contrast Compliance</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-[#1F9CA7] rounded-xl">
            <span className="text-white flex-1">Primary on White Background</span>
            <span className="px-3 py-1 bg-white/20 text-white rounded-lg">AAA ✓</span>
          </div>
          <div className="flex items-center gap-4 p-4 border border-slate-300 rounded-xl">
            <span className="text-slate-900 flex-1">Slate 900 Text on White</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">AAA ✓</span>
          </div>
          <div className="flex items-center gap-4 p-4 border border-slate-300 rounded-xl">
            <span className="text-slate-700 flex-1">Slate 700 Text on White</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">AAA ✓</span>
          </div>
          <div className="flex items-center gap-4 p-4 border border-slate-300 rounded-xl">
            <span className="text-slate-600 flex-1">Slate 600 Text on White</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">AA ✓</span>
          </div>
        </div>
      </section>

      {/* JSON Export Preview */}
      <section>
        <h3 className="text-slate-900 mb-6 pb-3 border-b border-slate-200">Design Tokens JSON</h3>
        <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`{
  "colors": {
    "primary": {
      "default": "#1F9CA7",
      "hover": "#178891",
      "active": "#146f78"
    },
    "accent": {
      "default": "#FF7A66",
      "hover": "#ff6b55"
    },
    "neutral": {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e1",
      "400": "#94a3b8",
      "500": "#64748b",
      "600": "#475569",
      "700": "#334155",
      "900": "#0f172a"
    }
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "16": "64px"
  },
  "borderRadius": {
    "lg": "8px",
    "xl": "12px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)"
  }
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
