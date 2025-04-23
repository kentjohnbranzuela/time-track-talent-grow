
import React from "react";
import { Search } from "lucide-react";

interface EmployeeSearchProps {
  value: string;
  onChange: (v: string) => void;
}

export function EmployeeSearch({ value, onChange }: EmployeeSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search employees by name, department, or position..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
