import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Calendar,
  ChevronDown,
  LogIn,
} from 'lucide-react';
import { UserButton, useAuth, useClerk } from '@clerk/react';

export const Topbar = ({ onMenuClick, onSearchGlobal }) => {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState('21 Sep 2026');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchGlobal) onSearchGlobal(searchValue);
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-transparent px-6 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Search input */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-xs"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full max-w-md"
        >
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search route, city or airline..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-700 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </form>
      </div>

      {/* Right: Date selector, Notification Bell, User Avatar */}
      <div className="flex items-center gap-3">
        {/* Date Selector Pill */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setShowDateMenu(!showDateMenu)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{selectedDate}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showDateMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDateMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 z-50 p-1.5 text-xs text-slate-700">
                {['21 Sep 2026', '20 Sep 2026', '19 Sep 2026', '15 Sep 2026'].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDate(d);
                      setShowDateMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors ${
                      selectedDate === d ? 'font-semibold text-brand-600 bg-brand-50/50' : ''
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bell Icon with Red Dot */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 bg-white border border-slate-200/80 shadow-xs transition-colors relative"
          >
            <Bell className="w-4 h-4 text-slate-500" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-semibold text-slate-800">
                  <span>Price Spike Alerts</span>
                  <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                    17 Active
                  </span>
                </div>
                <div className="py-2 space-y-2 text-slate-600">
                  <div className="p-2 bg-rose-50/50 rounded-lg border border-rose-100">
                    <strong className="text-slate-900 block">Bhopal → Delhi +18.4%</strong>
                    <span className="text-slate-500">Unusual fare spike detected on IndiGo & Air India.</span>
                  </div>
                  <div className="p-2 bg-amber-50/50 rounded-lg border border-amber-100">
                    <strong className="text-slate-900 block">Delhi → Goa +12.1%</strong>
                    <span className="text-slate-500">Weekend leisure route uptick.</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Auth: Login button or UserButton */}
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;
