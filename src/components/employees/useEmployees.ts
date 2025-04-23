
import { useState, useEffect } from "react";
import { Employee } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function useEmployees() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // For demo: Set admin = true for access to features.
  const isAdmin = true;
  const employeesPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch employees from Supabase once
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
    // Run only once (useToast is fine as dep since it's stable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtering
  const filteredEmployees = employees.filter(employee =>
    employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const totalColumns = isAdmin ? 7 : 6;

  // On search/filter, reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Add
  const handleEmployeeAdded = (newEmployee: Employee) => {
    setEmployees((prev) => [
      newEmployee,
      ...prev,
    ]);
  };

  // Update status
  const handleStatusChange = (id: string, newStatus: Employee["status"]) => {
    setEmployees((prev) =>
      prev.map(emp =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
  };

  return {
    isAdmin,
    loading,
    employees,
    searchQuery,
    setSearchQuery,
    currentEmployees,
    currentPage,
    setCurrentPage,
    totalPages,
    totalColumns,
    handleEmployeeAdded,
    handleStatusChange,
  };
}
