
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Clock, Video, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const AttendanceForm = () => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<'facial' | 'online' | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const attendanceMethods = [
    { id: 'facial', name: 'Facial Recognition', icon: User },
    { id: 'online', name: 'Online Check-in', icon: Video },
  ];

  const handleMethodSelect = (method: 'facial' | 'online') => {
    setSelectedMethod(method);
    if (method === 'facial') {
      setCameraActive(true);
    } else {
      setCameraActive(false);
    }
  };

  const handleCheckIn = () => {
    if (!selectedMethod) return;
    
    setIsChecking(true);
    
    // Simulate a process
    setTimeout(() => {
      setIsChecking(false);
      setCameraActive(false);
      
      toast({
        title: "Check-in successful",
        description: `You've been checked in using ${selectedMethod === 'facial' ? 'facial recognition' : 'online'} at ${new Date().toLocaleTimeString()}.`,
        variant: "default",
      });
      
      setSelectedMethod(null);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Mark Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedMethod ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attendanceMethods.map((method) => (
              <Button
                key={method.id}
                variant="outline"
                className={cn(
                  "h-auto py-6 flex flex-col items-center justify-center gap-3 hover:bg-info/10 hover:text-info hover:border-info",
                )}
                onClick={() => handleMethodSelect(method.id as 'facial' | 'online')}
              >
                <div className="h-12 w-12 rounded-full bg-info/10 flex items-center justify-center">
                  <method.icon className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-gray-500">
                    {method.id === 'facial' 
                      ? 'Use your camera to verify your identity' 
                      : 'Quick check-in with one click'}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {selectedMethod === 'facial' && (
              <div className="aspect-video bg-gray-100 relative rounded-lg overflow-hidden">
                {cameraActive ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isChecking ? (
                        <div className="text-center">
                          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-info border-t-transparent"></div>
                          <p className="mt-4 text-gray-600">Verifying your identity...</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="relative inline-flex">
                            <User className="h-20 w-20 text-info" />
                            <span className="animate-pulse-ring absolute inset-0 border-4 border-info rounded-full opacity-75"></span>
                          </div>
                          <p className="mt-4 text-gray-600">Position your face in the frame</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Camera will activate when you check in</p>
                  </div>
                )}
              </div>
            )}
            
            {selectedMethod === 'online' && (
              <div className="text-center py-6">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-info/10 mb-4">
                  <Clock className="h-12 w-12 text-info" />
                </div>
                <h3 className="text-lg font-medium">Online Check-in</h3>
                <p className="text-gray-500 mt-2">
                  You're about to check in for today. Your location will be recorded.
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedMethod(null);
                  setCameraActive(false);
                }}
                disabled={isChecking}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-info hover:bg-info/90"
                onClick={handleCheckIn}
                disabled={isChecking}
              >
                {isChecking ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Processing...
                  </>
                ) : (
                  'Check In Now'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceForm;
