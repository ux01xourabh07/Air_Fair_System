import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  BarChart2,
  Calendar,
  TrendingUp,
  FileText,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose, onOpenSettings, onLogout }) => {
  const navItems = [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Route Explorer',
      to: '/route-explorer',
      icon: Search,
    },
    {
      name: 'Airline Analysis',
      to: '/airlines',
      icon: BarChart2,
    },
    {
      name: 'Seasonal Trends',
      to: '/seasonal-trends',
      icon: Calendar,
    },
    {
      name: 'Forecast',
      to: '/forecast',
      icon: TrendingUp,
    },
    {
      name: 'Reports',
      to: '/reports',
      icon: FileText,
    },
    {
      name: 'History',
      to: '/history',
      icon: Clock,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#eef2f6] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="h-20 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              {/* Airplane Logo Icon */}
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#0fa497]">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.8-.2-1.6.1-2 .7l-.5.7 6.4 3.7-3.7 3.7-2.6-.6c-.5-.1-1 .1-1.3.4l-.3.4 3.5 2 2 3.5.4-.3c.3-.3.5-.8.4-1.3l-.6-2.6 3.7-3.7 3.7 6.4.7-.5c.6-.4.9-1.2.7-2z" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-base font-bold text-slate-900 tracking-tight">
                  Airfare Intelligence
                </div>
                <div className="text-xs text-slate-400 font-normal">
                  India's Airfare Index
                </div>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#e8f7f5] text-[#0fa497] font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-[#0fa497]' : 'text-slate-500'
                          }`}
                        />
                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-1">
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Settings</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Help & Support</span>
          </button>

          <div className="pt-2">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
