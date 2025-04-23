
import React from "react";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { Employee } from "@/lib/types";
import { EmployeeRowActions } from "./EmployeeRowActions";

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  isAdmin: boolean;
  onStatusChange: (id: string, newStatus: Employee["status"]) => void;
  totalColumns: number;
}

export function EmployeeTable({
  employees,
  loading,
  isAdmin,
  onStatusChange,
  totalColumns
}: EmployeeTableProps) {
  return (
    loading ? (
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
          {employees.length > 0 ? (
            employees.map((employee) => (
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
                      onStatusChange={onStatusChange}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={totalColumns} className="text-center py-8">
                No employees found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  );
}
