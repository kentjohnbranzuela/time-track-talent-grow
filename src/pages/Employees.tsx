
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeSearch } from "@/components/employees/EmployeeSearch";
import { EmployeePagination } from "@/components/employees/EmployeePagination";
import { useEmployees } from "@/components/employees/useEmployees";

const Employees = () => {
  const {
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
  } = useEmployees();

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
            <div className="text-center text-muted-foreground py-4">
              Try adjusting your search.
            </div>
          )}
          {(!loading && employees.length === 0) && (
            <div className="text-center text-muted-foreground py-4">
              Add employees to get started.
            </div>
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
