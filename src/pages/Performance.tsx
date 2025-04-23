
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChartBar } from "lucide-react";
import { performanceMetrics, performanceReviews } from '@/lib/data';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Performance = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("metrics");
  
  // Prepare data for metrics chart
  const metricsData = performanceMetrics.map(metric => ({
    name: metric.name,
    target: metric.target,
    achieved: metric.achieved,
  }));

  const handleStartReview = () => {
    toast({
      title: "Performance Review",
      description: "Starting a new performance review process.",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Performance Management</h1>
        <Button onClick={handleStartReview}>
          <ChartBar className="mr-2 h-4 w-4" />
          Start New Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.35/5</div>
            <p className="text-xs text-muted-foreground">Based on all reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reviews Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">For Q1 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Metrics Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Period Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={metricsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="target" fill="#8884d8" name="Target" />
                    <Bar dataKey="achieved" fill="#82ca9d" name="Achieved" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Performance Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceReviews.map((review) => (
                  <Card key={review.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Employee ID: {review.employeeId}</h3>
                          <p className="text-sm text-muted-foreground">Reviewed on {review.date}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 text-xl font-bold rounded-full h-12 w-12 flex items-center justify-center">
                          {review.rating}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-sm">Strengths:</h4>
                        <ul className="list-disc list-inside text-sm mt-1">
                          {review.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-2">
                        <h4 className="font-medium text-sm">Areas for Improvement:</h4>
                        <ul className="list-disc list-inside text-sm mt-1">
                          {review.improvements.map((improvement, index) => (
                            <li key={index}>{improvement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t">
                        <p className="text-sm italic">{review.comments}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;
