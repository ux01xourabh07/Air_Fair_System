import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { X, CheckCircle, Sliders, Save } from 'lucide-react';
import { useClerk } from '@clerk/react';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: '/' });
  };

  const handleGlobalSearch = (query) => {
    if (!query) return;
    const lower = query.toLowerCase();
    if (lower.includes('airline') || lower.includes('indigo') || lower.includes('air india') || lower.includes('akasa') || lower.includes('spicejet')) {
      navigate('/airlines');
    } else if (lower.includes('forecast') || lower.includes('trend') || lower.includes('outlook')) {
      navigate('/forecast');
    } else if (lower.includes('history') || lower.includes('search') || lower.includes('login') || lower.includes('bhopal')) {
      navigate('/history');
    } else {
      navigate('/dashboard');
    }
    showToast(`Showing results for "${query}"`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex font-sans">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        {/* Topbar */}
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          onSearchGlobal={handleGlobalSearch}
        />

        {/* Page View Container */}
        <main className="flex-1 px-6 sm:px-8 pb-10 max-w-[1500px] w-full mx-auto">
          <Outlet context={{ showToast }} />
        </main>
      </div>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#0fa497]" />
                <h3 className="text-base font-bold text-slate-900">Platform Settings</h3>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Alert Sensitivity Threshold
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-700">
                  <option>High (Triggers on +10% fare rise)</option>
                  <option selected>Moderate (Triggers on +15% fare rise)</option>
                  <option>Conservative (Triggers on +25% fare rise)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Default Route View
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-700">
                  <option>All 428 Indian Routes</option>
                  <option>Trunk Routes Only (Delhi, Mumbai, Bengaluru)</option>
                  <option>Regional / UDAN Network</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(false);
                    showToast('Settings saved successfully.', 'success');
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0fa497] hover:bg-[#0d8e82] text-white shadow-xs"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage.message}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
