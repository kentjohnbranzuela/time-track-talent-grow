
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Pagination, PaginationContent, PaginationItem, 
  PaginationNext, PaginationPrevious 
} from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { Employee } from "@/lib/types";
import { supabase } from "@/lib/supabaseClient";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";
import { EmployeeRowActions } from "@/components/employees/EmployeeRowActions";

// For demo: Set admin = true for access to features.
const isAdmin = true;

const Employees = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const employeesPerPage = 4;

  // Fetch employees from Supabase
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.from("employees").select("*");
      if (error) {
        toast({
          title: "Error fetching employees",
          description: error.message,
          variant: "destructive"
        });
        setEmployees([]);
      } else {
        setEmployees(data || []);
      }
      setLoading(false);
    })();
  }, [toast]);

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Paginate employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Add employee callback
  const handleEmployeeAdded = (newEmployee: Employee) => {
    setEmployees((prev) => [newEmployee, ...prev]);
  };

  // Update status callback
  const handleStatusChange = (id: string, newStatus: Employee["status"]) => {
    setEmployees((prev) =>
      prev.map(emp =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        {isAdmin && <AddEmployeeDialog onEmployeeAdded={handleEmployeeAdded} />}
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search employees by name, department, or position..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Card>
        <CardContent className="p-0">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src={employee.avatar || "/placeholder.svg"} 
                        alt={employee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell className="text-sm">{employee.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${employee.status === 'active' ? 'bg-green-100 text-green-800' : 
                       employee.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                       'bg-yellow-100 text-yellow-800'}`}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </span>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <EmployeeRowActions
                        employee={employee}
                        onStatusChange={handleStatusChange}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        </CardContent>
      </Card>
      
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            <PaginationItem className="py-2 px-4 flex items-center justify-center">
              Page {currentPage} of {totalPages}
            </PaginationItem>
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Employees;

