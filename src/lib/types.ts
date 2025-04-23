
// Employee Types
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
}

// Attendance Types
export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'work-from-home';
  method: 'facial' | 'online' | 'manual' | 'mobile';
}

// Leave Types
export type LeaveType = 'annual' | 'sick' | 'maternity' | 'paternity' | 'unpaid' | 'other';

export interface LeaveBalance {
  employeeId: string;
  annual: number;
  sick: number;
  maternity: number;
  paternity: number;
  unpaid: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt: string;
}

// Payroll Types
export interface PayrollRecord {
  id: string;
  employeeId: string;
  period: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  taxes: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
  paymentDate?: string;
}

// Performance Types
export interface PerformanceMetric {
  id: string;
  employeeId: string;
  category: string;
  name: string;
  target: number;
  achieved: number;
  unit: string;
  period: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  date: string;
  rating: number;
  strengths: string[];
  improvements: string[];
  comments: string;
}
