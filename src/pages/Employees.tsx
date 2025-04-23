
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Employee } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeSearch } from "@/components/employees/EmployeeSearch";
import { EmployeePagination } from "@/components/employees/EmployeePagination";

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
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("employees").select("*");
        if (error) {
          console.error("Error fetching employees:", error);
          toast({
            title: "Error fetching employees",
            description: error.message,
            variant: "destructive"
          });
          setEmployees([]);
        } else {
          // Map and strongly type "status"
          const mappedEmployees: Employee[] = (data?.map(emp => ({
            ...emp,
            joinDate: emp.joindate,
            status: (["active", "inactive", "on-leave"].includes(emp.status)
              ? emp.status
              : "inactive") as Employee["status"],
            avatar: emp.avatar || "/placeholder.svg",
            phone: emp.phone ?? ""
          })) ?? []);
          setEmployees(mappedEmployees);
        }
      } catch (e) {
        console.error("Exception when fetching employees:", e);
        toast({
          title: "Failed to fetch employees",
          description: "An unexpected error occurred",
          variant: "destructive"
        });
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [toast]);

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const totalColumns = isAdmin ? 7 : 6;

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

  // When filter/search changes, reset to first page
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        {isAdmin && <AddEmployeeDialog onEmployeeAdded={handleEmployeeAdded} />}
      </div>

      <EmployeeSearch value={searchQuery} onChange={setSearchQuery} />

      <Card>
        <CardContent className="p-0">
          <EmployeeTable
            employees={currentEmployees}
            loading={loading}
            isAdmin={isAdmin}
            onStatusChange={handleStatusChange}
            totalColumns={totalColumns}
          />
          {(!loading && currentEmployees.length === 0 && employees.length > 0) && (
            <div className="text-center text-muted-foreground py-4">Try adjusting your search.</div>
          )}
          {(!loading && employees.length === 0) && (
            <div className="text-center text-muted-foreground py-4">Add employees to get started.</div>
          )}
        </CardContent>
      </Card>

      <EmployeePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Employees;
