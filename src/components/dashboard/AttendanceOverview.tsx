
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAttendanceStats } from '@/lib/data';

const AttendanceOverview = () => {
  const stats = getAttendanceStats();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold inline-block text-info">
                Present ({stats.presentPercentage}%)
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block">
                {stats.presentToday}/{stats.totalEmployees}
              </span>
            </div>
          </div>
          <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
            <div
              style={{ width: `${stats.presentPercentage}%` }}
              className="flex flex-col justify-center text-center text-white bg-info shadow-none whitespace-nowrap"
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-info bg-opacity-10 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500">Present</p>
            <p className="font-semibold text-lg">{stats.presentToday}</p>
          </div>
          <div className="bg-warning bg-opacity-10 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500">Late</p>
            <p className="font-semibold text-lg">{stats.lateToday}</p>
          </div>
          <div className="bg-destructive bg-opacity-10 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500">Absent</p>
            <p className="font-semibold text-lg">{stats.absentToday}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceOverview;
