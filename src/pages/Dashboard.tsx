
import React from 'react';
import { Clock, Calendar, FileText, ChartBar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

import StatCard from '@/components/dashboard/StatCard';
import AttendanceOverview from '@/components/dashboard/AttendanceOverview';
import EmployeeActivity from '@/components/dashboard/EmployeeActivity';
import LeaveRequests from '@/components/dashboard/LeaveRequests';
import AttendanceForm from '@/components/attendance/AttendanceForm';

const Dashboard = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome to HR Management</h2>
            <p className="text-gray-500 mt-1">
              Here's what's happening with your team today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-info hover:bg-info/90">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Today</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value="5"
          icon={<Users className="h-6 w-6 text-info" />}
          color="info"
          change={{ value: 2, positive: true }}
        />
        <StatCard
          title="Present Today"
          value="4"
          icon={<Clock className="h-6 w-6 text-success" />}
          color="success"
        />
        <StatCard
          title="On Leave"
          value="1"
          icon={<Calendar className="h-6 w-6 text-warning" />}
          color="warning"
        />
        <StatCard
          title={`${currentMonth} Payroll`}
          value="$27,000"
          icon={<FileText className="h-6 w-6 text-info" />}
          color="info"
          change={{ value: 5, positive: true }}
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-6">
          <AttendanceForm />
          <AttendanceOverview />
        </div>
        <div className="grid gap-6 grid-cols-1">
          <EmployeeActivity />
          <LeaveRequests />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
