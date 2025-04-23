
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Clock, Video, User } from 'lucide-react';
import { attendanceRecords, employees } from '@/lib/data';
import { Attendance as AttendanceType } from '@/lib/types';
import AttendanceForm from '@/components/attendance/AttendanceForm';
import { useToast } from '@/components/ui/use-toast';

const Attendance = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  // Format date for attendance records
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Get attendance records for the current view
  const getAttendanceForView = (): AttendanceType[] => {
    const dateStr = formatDate(currentDate);
    return attendanceRecords.filter(record => record.date === dateStr);
  };

  const attendanceData = getAttendanceForView();

  // Navigate between dates
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    
    setCurrentDate(newDate);
  };

  // Get attendance status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'half-day':
        return 'bg-orange-100 text-orange-800';
      case 'work-from-home':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get attendance method icon
  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'facial':
        return <User className="h-4 w-4" />;
      case 'online':
        return <Video className="h-4 w-4" />;
      case 'mobile':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Handle record attendance
  const handleRecordAttendance = () => {
    toast({
      title: "Feature not implemented",
      description: "Manual attendance recording will be available in the next version.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <AttendanceForm />
        </div>

        <Card className="md:w-2/3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Attendance Records</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center px-2">
                  <Calendar className="h-4 w-4 mr-2 text-info" />
                  <span>{currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Employee</th>
                    <th className="px-4 py-3 text-left font-medium">Check-in</th>
                    <th className="px-4 py-3 text-left font-medium">Check-out</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Method</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {attendanceData.length > 0 ? (
                    attendanceData.map(record => {
                      const employee = employees.find(e => e.id === record.employeeId);
                      return (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <img 
                                src={employee?.avatar} 
                                alt={employee?.name}
                                className="h-8 w-8 rounded-full mr-3"
                              />
                              <div>
                                <p className="font-medium">{employee?.name}</p>
                                <p className="text-xs text-gray-500">{employee?.position}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">{record.checkIn}</td>
                          <td className="px-4 py-3">{record.checkOut || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {getMethodIcon(record.method)}
                              <span className="ml-2 capitalize">{record.method}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {!record.checkOut && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleRecordAttendance}
                              >
                                Check-out
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No attendance records found for this date
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="mr-2" onClick={handleRecordAttendance}>
                Export Data
              </Button>
              <Button className="bg-info hover:bg-info/90" onClick={handleRecordAttendance}>
                Record Attendance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
