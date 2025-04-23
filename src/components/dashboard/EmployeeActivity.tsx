
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { attendanceRecords } from '@/lib/data';
import { employees } from '@/lib/data';

const EmployeeActivity = () => {
  // Get today's date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  
  // Get employees who checked in today
  const todayAttendance = attendanceRecords
    .filter(record => record.date === today)
    .map(record => {
      const employee = employees.find(emp => emp.id === record.employeeId);
      return {
        id: record.employeeId,
        name: employee?.name || 'Unknown',
        avatar: employee?.avatar || '',
        checkIn: record.checkIn,
        method: record.method,
        status: record.status
      };
    })
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn));

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Check-ins</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[360px]">
        <div className="space-y-4">
          {todayAttendance.length > 0 ? (
            todayAttendance.map(employee => (
              <div key={employee.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                <div className="relative">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <span 
                    className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white ${
                      employee.status === 'present' ? 'bg-success' : 
                      employee.status === 'late' ? 'bg-warning' : 'bg-destructive'
                    }`}
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Checked in at {employee.checkIn}</span>
                    <span className="mx-1">•</span>
                    <span className="capitalize">{employee.method}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span 
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      employee.status === 'present' ? 'bg-green-100 text-green-800' : 
                      employee.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No check-ins recorded today
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeActivity;
