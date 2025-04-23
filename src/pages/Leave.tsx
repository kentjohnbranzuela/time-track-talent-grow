
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, FileText, Plus } from 'lucide-react';
import { leaveRequests, employees, leaveBalances } from '@/lib/data';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { LeaveRequest, LeaveType } from '@/lib/types';

const LeaveManagement = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('requests');

  const handleAction = (action: 'approve' | 'reject', id: string) => {
    toast({
      title: `Leave request ${action === 'approve' ? 'approved' : 'rejected'}`,
      description: `You have successfully ${action === 'approve' ? 'approved' : 'rejected'} the leave request.`,
      variant: "default",
    });
  };

  const handleNotImplemented = () => {
    toast({
      title: "Feature not implemented",
      description: "This feature will be available in the next version.",
      variant: "default",
    });
  };

  // Get pending leave requests with employee information
  const pendingRequests = leaveRequests
    .filter(request => request.status === 'pending')
    .map(request => {
      const employee = employees.find(emp => emp.id === request.employeeId);
      return {
        ...request,
        employeeName: employee?.name || 'Unknown',
        employeeAvatar: employee?.avatar || '',
      };
    });

  // Get all leave requests with employee information
  const allRequests = leaveRequests
    .map(request => {
      const employee = employees.find(emp => emp.id === request.employeeId);
      return {
        ...request,
        employeeName: employee?.name || 'Unknown',
        employeeAvatar: employee?.avatar || '',
      };
    });

  const getLeaveTypeColor = (type: LeaveType) => {
    const colors: Record<LeaveType, string> = {
      annual: 'bg-blue-100 text-blue-800',
      sick: 'bg-red-100 text-red-800',
      maternity: 'bg-pink-100 text-pink-800',
      paternity: 'bg-indigo-100 text-indigo-800',
      unpaid: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type];
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="md:w-1/3 space-y-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Leave Balances */}
          <Card>
            <CardHeader>
              <CardTitle>Leave Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveBalances.map((balance, index) => {
                  const employee = employees.find(emp => emp.id === balance.employeeId);
                  if (!employee) return null;
                  
                  return (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center mb-3">
                        <img 
                          src={employee.avatar} 
                          alt={employee.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-gray-500">{employee.position}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Annual:</span>
                          <span className="font-medium">{balance.annual} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Sick:</span>
                          <span className="font-medium">{balance.sick} days</span>
                        </div>
                        {balance.maternity > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Maternity:</span>
                            <span className="font-medium">{balance.maternity} days</span>
                          </div>
                        )}
                        {balance.paternity > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Paternity:</span>
                            <span className="font-medium">{balance.paternity} days</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-500">Unpaid:</span>
                          <span className="font-medium">{balance.unpaid} days</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Leave Requests</CardTitle>
              <Button onClick={handleNotImplemented} className="bg-info hover:bg-info/90">
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="requests" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="requests" onClick={() => setActiveTab('requests')}>All Requests</TabsTrigger>
                  <TabsTrigger value="pending" onClick={() => setActiveTab('pending')}>Pending</TabsTrigger>
                  <TabsTrigger value="calendar" onClick={() => setActiveTab('calendar')}>Calendar View</TabsTrigger>
                </TabsList>
                <TabsContent value="requests" className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-medium">Employee</th>
                          <th className="px-4 py-3 text-left font-medium">Type</th>
                          <th className="px-4 py-3 text-left font-medium">Period</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {allRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <img 
                                  src={request.employeeAvatar} 
                                  alt={request.employeeName}
                                  className="h-8 w-8 rounded-full mr-2"
                                />
                                <span>{request.employeeName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${getLeaveTypeColor(request.type)}`}>
                                {request.type}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {request.status === 'pending' ? (
                                <div className="flex space-x-1">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleAction('reject', request.id)}
                                  >
                                    Reject
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="default"
                                    className="bg-success hover:bg-success/90"
                                    onClick={() => handleAction('approve', request.id)}
                                  >
                                    Approve
                                  </Button>
                                </div>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleNotImplemented}
                                >
                                  View Details
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="pending" className="mt-4">
                  <div className="space-y-4">
                    {pendingRequests.length > 0 ? (
                      pendingRequests.map(request => (
                        <div key={request.id} className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center">
                            <img
                              src={request.employeeAvatar}
                              alt={request.employeeName}
                              className="h-10 w-10 rounded-full"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium">{request.employeeName}</p>
                              <div className="flex items-center">
                                <span className={`px-2 py-0.5 rounded-full text-xs mr-2 ${getLeaveTypeColor(request.type)}`}>
                                  {request.type}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(request.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Duration:</span>
                              <span className="font-medium">
                                {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-500">Reason:</span>
                              <span className="font-medium">{request.reason}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAction('reject', request.id)}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              variant="default"
                              className="bg-success hover:bg-success/90"
                              onClick={() => handleAction('approve', request.id)}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No pending leave requests
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="calendar" className="mt-4">
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Calendar View</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Calendar view will be available in the next version.
                    </p>
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        onClick={handleNotImplemented}
                      >
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
