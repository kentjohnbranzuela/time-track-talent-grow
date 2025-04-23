
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  Calendar,
  Users,
  Clock,
  FileText,
  ChartBar,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const navigation = [
    { name: 'Dashboard', icon: ChartBar, path: '/' },
    { name: 'Attendance', icon: Clock, path: '/attendance' },
    { name: 'Leave Management', icon: Calendar, path: '/leave' },
    { name: 'Payroll', icon: FileText, path: '/payroll' },
    { name: 'Performance', icon: ChartBar, path: '/performance' },
    { name: 'Employees', icon: Users, path: '/employees' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNotImplemented = () => {
    toast({
      title: "Feature not implemented",
      description: "This feature will be available in the next version.",
      variant: "default",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white shadow-md transition-all duration-300 ease-in-out z-20",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-info">HR Management</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isCollapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              )}
            </svg>
          </button>
        </div>
        <nav className="mt-6 px-2">
          <ul>
            {navigation.map((item) => (
              <li key={item.name} className="mb-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center p-3 rounded-md transition-colors",
                      isActive
                        ? "bg-info bg-opacity-10 text-info"
                        : "hover:bg-gray-100"
                    )
                  }
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl font-semibold">
                {navigation.find((item) => item.path === window.location.pathname)?.name || "Dashboard"}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleNotImplemented}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-info text-white flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                {!isCollapsed && (
                  <div className="ml-2">
                    <p className="font-semibold">Admin User</p>
                    <p className="text-xs text-gray-500">HR Manager</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
