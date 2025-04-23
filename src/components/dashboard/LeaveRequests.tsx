
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { leaveRequests, employees } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

const LeaveRequests = () => {
  const { toast } = useToast();

  const handleAction = (action: 'approve' | 'reject', id: string) => {
    toast({
      title: `Leave request ${action === 'approve' ? 'approved' : 'rejected'}`,
      description: `You have successfully ${action === 'approve' ? 'approved' : 'rejected'} the leave request.`,
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Pending Leave Requests</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[360px]">
        {pendingRequests.length > 0 ? (
          <div className="space-y-4">
            {pendingRequests.map(request => (
              <div key={request.id} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center">
                  <img
                    src={request.employeeAvatar}
                    alt={request.employeeName}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium">{request.employeeName}</p>
                    <p className="text-xs text-gray-500 capitalize">{request.type} Leave</p>
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
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No pending leave requests
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaveRequests;
