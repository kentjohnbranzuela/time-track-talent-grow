
import { 
  Employee, Attendance, LeaveBalance, LeaveRequest, 
  PayrollRecord, PerformanceMetric, PerformanceReview 
} from './types';

// Mock Employees
export const employees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'john.smith@company.com',
    phone: '(555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?img=1',
    joinDate: '2022-01-15',
    salary: 85000,
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    position: 'Marketing Specialist',
    department: 'Marketing',
    email: 'sarah.johnson@company.com',
    phone: '(555) 234-5678',
    avatar: 'https://i.pravatar.cc/150?img=5',
    joinDate: '2021-10-03',
    salary: 65000,
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Chen',
    position: 'Product Manager',
    department: 'Product',
    email: 'michael.chen@company.com',
    phone: '(555) 345-6789',
    avatar: 'https://i.pravatar.cc/150?img=3',
    joinDate: '2022-03-22',
    salary: 95000,
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    position: 'HR Coordinator',
    department: 'Human Resources',
    email: 'emily.rodriguez@company.com',
    phone: '(555) 456-7890',
    avatar: 'https://i.pravatar.cc/150?img=9',
    joinDate: '2023-01-08',
    salary: 60000,
    status: 'on-leave'
  },
  {
    id: '5',
    name: 'Robert Taylor',
    position: 'Financial Analyst',
    department: 'Finance',
    email: 'robert.taylor@company.com',
    phone: '(555) 567-8901',
    avatar: 'https://i.pravatar.cc/150?img=12',
    joinDate: '2022-09-15',
    salary: 75000,
    status: 'active'
  }
];

// Current date and day of week
const today = new Date();
const currDay = today.toISOString().split('T')[0];
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0];

// Mock Attendance Records
export const attendanceRecords: Attendance[] = [
  {
    id: 'a1',
    employeeId: '1',
    date: currDay,
    checkIn: '09:02:34',
    checkOut: null,
    status: 'present',
    method: 'facial'
  },
  {
    id: 'a2',
    employeeId: '2',
    date: currDay,
    checkIn: '08:57:12',
    checkOut: null,
    status: 'present',
    method: 'online'
  },
  {
    id: 'a3',
    employeeId: '3',
    date: currDay,
    checkIn: '09:15:45',
    checkOut: null,
    status: 'late',
    method: 'mobile'
  },
  {
    id: 'a4',
    employeeId: '5',
    date: currDay,
    checkIn: '08:50:22',
    checkOut: null,
    status: 'present',
    method: 'facial'
  },
  {
    id: 'a5',
    employeeId: '1',
    date: yesterdayStr,
    checkIn: '09:01:14',
    checkOut: '17:32:45',
    status: 'present',
    method: 'facial'
  },
  {
    id: 'a6',
    employeeId: '2',
    date: yesterdayStr,
    checkIn: '08:55:02',
    checkOut: '17:05:12',
    status: 'present',
    method: 'online'
  },
  {
    id: 'a7',
    employeeId: '3',
    date: yesterdayStr,
    checkIn: '09:10:33',
    checkOut: '17:45:21',
    status: 'late',
    method: 'mobile'
  },
  {
    id: 'a8',
    employeeId: '4',
    date: yesterdayStr,
    checkIn: '08:59:45',
    checkOut: '17:15:38',
    status: 'present',
    method: 'online'
  },
  {
    id: 'a9',
    employeeId: '5',
    date: yesterdayStr,
    checkIn: '08:48:17',
    checkOut: '17:30:05',
    status: 'present',
    method: 'facial'
  }
];

// Mock Leave Balances
export const leaveBalances: LeaveBalance[] = [
  {
    employeeId: '1',
    annual: 18,
    sick: 10,
    maternity: 0,
    paternity: 5,
    unpaid: 30
  },
  {
    employeeId: '2',
    annual: 15,
    sick: 8,
    maternity: 12,
    paternity: 0,
    unpaid: 30
  },
  {
    employeeId: '3',
    annual: 12,
    sick: 10,
    maternity: 0,
    paternity: 5,
    unpaid: 30
  },
  {
    employeeId: '4',
    annual: 20,
    sick: 10,
    maternity: 12,
    paternity: 0,
    unpaid: 30
  },
  {
    employeeId: '5',
    annual: 16,
    sick: 10,
    maternity: 0,
    paternity: 5,
    unpaid: 30
  }
];

// Mock Leave Requests
export const leaveRequests: LeaveRequest[] = [
  {
    id: 'lr1',
    employeeId: '4',
    type: 'sick',
    startDate: currDay,
    endDate: '2025-04-24',
    reason: 'Medical appointment and recovery',
    status: 'approved',
    approvedBy: '1',
    createdAt: '2025-04-21T08:30:00Z'
  },
  {
    id: 'lr2',
    employeeId: '1',
    type: 'annual',
    startDate: '2025-05-10',
    endDate: '2025-05-15',
    reason: 'Family vacation',
    status: 'pending',
    createdAt: '2025-04-22T14:15:00Z'
  },
  {
    id: 'lr3',
    employeeId: '3',
    type: 'annual',
    startDate: '2025-05-18',
    endDate: '2025-05-20',
    reason: 'Personal time',
    status: 'pending',
    createdAt: '2025-04-22T09:40:00Z'
  }
];

// Mock Payroll Records
export const payrollRecords: PayrollRecord[] = [
  {
    id: 'p1',
    employeeId: '1',
    period: 'March 2025',
    baseSalary: 7083.33,
    bonuses: 500,
    deductions: 125,
    taxes: 1489.67,
    netSalary: 5968.66,
    status: 'paid',
    paymentDate: '2025-03-31'
  },
  {
    id: 'p2',
    employeeId: '2',
    period: 'March 2025',
    baseSalary: 5416.67,
    bonuses: 0,
    deductions: 100,
    taxes: 1063.33,
    netSalary: 4253.34,
    status: 'paid',
    paymentDate: '2025-03-31'
  },
  {
    id: 'p3',
    employeeId: '3',
    period: 'March 2025',
    baseSalary: 7916.67,
    bonuses: 750,
    deductions: 150,
    taxes: 1703.33,
    netSalary: 6813.34,
    status: 'paid',
    paymentDate: '2025-03-31'
  },
  {
    id: 'p4',
    employeeId: '4',
    period: 'March 2025',
    baseSalary: 5000.00,
    bonuses: 200,
    deductions: 75,
    taxes: 1025.00,
    netSalary: 4100.00,
    status: 'paid',
    paymentDate: '2025-03-31'
  },
  {
    id: 'p5',
    employeeId: '5',
    period: 'March 2025',
    baseSalary: 6250.00,
    bonuses: 300,
    deductions: 125,
    taxes: 1285.00,
    netSalary: 5140.00,
    status: 'paid',
    paymentDate: '2025-03-31'
  },
  {
    id: 'p6',
    employeeId: '1',
    period: 'April 2025',
    baseSalary: 7083.33,
    bonuses: 0,
    deductions: 0,
    taxes: 1416.67,
    netSalary: 5666.66,
    status: 'pending'
  },
  {
    id: 'p7',
    employeeId: '2',
    period: 'April 2025',
    baseSalary: 5416.67,
    bonuses: 0,
    deductions: 0,
    taxes: 1083.33,
    netSalary: 4333.34,
    status: 'pending'
  },
  {
    id: 'p8',
    employeeId: '3',
    period: 'April 2025',
    baseSalary: 7916.67,
    bonuses: 0,
    deductions: 0,
    taxes: 1583.33,
    netSalary: 6333.34,
    status: 'pending'
  },
  {
    id: 'p9',
    employeeId: '5',
    period: 'April 2025',
    baseSalary: 6250.00,
    bonuses: 0,
    deductions: 0,
    taxes: 1250.00,
    netSalary: 5000.00,
    status: 'pending'
  }
];

// Mock Performance Metrics
export const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'pm1',
    employeeId: '1',
    category: 'Productivity',
    name: 'Code Commits',
    target: 45,
    achieved: 52,
    unit: 'commits',
    period: 'April 2025'
  },
  {
    id: 'pm2',
    employeeId: '1',
    category: 'Quality',
    name: 'Code Reviews',
    target: 15,
    achieved: 18,
    unit: 'reviews',
    period: 'April 2025'
  },
  {
    id: 'pm3',
    employeeId: '2',
    category: 'Productivity',
    name: 'Marketing Campaigns',
    target: 3,
    achieved: 4,
    unit: 'campaigns',
    period: 'April 2025'
  },
  {
    id: 'pm4',
    employeeId: '2',
    category: 'Engagement',
    name: 'Social Media Growth',
    target: 5,
    achieved: 3.8,
    unit: '%',
    period: 'April 2025'
  },
  {
    id: 'pm5',
    employeeId: '3',
    category: 'Leadership',
    name: 'Team Satisfaction',
    target: 4.5,
    achieved: 4.7,
    unit: 'out of 5',
    period: 'April 2025'
  }
];

// Mock Performance Reviews
export const performanceReviews: PerformanceReview[] = [
  {
    id: 'pr1',
    employeeId: '1',
    reviewerId: '3',
    date: '2025-03-15',
    rating: 4.5,
    strengths: ['Technical skills', 'Problem-solving', 'Teamwork'],
    improvements: ['Documentation', 'Knowledge sharing'],
    comments: 'John has been a valuable team member with excellent technical abilities. Looking forward to seeing more knowledge sharing with junior developers.'
  },
  {
    id: 'pr2',
    employeeId: '2',
    reviewerId: '3',
    date: '2025-03-16',
    rating: 4.2,
    strengths: ['Creativity', 'Communication', 'Project management'],
    improvements: ['Strategic planning', 'Data analysis'],
    comments: 'Sarah consistently delivers high-quality marketing materials and campaigns. She could benefit from developing stronger data analysis skills.'
  }
];

// Calculate attendance statistics
export const getAttendanceStats = () => {
  const totalEmployees = employees.filter(e => e.status !== 'inactive').length;
  const presentToday = attendanceRecords.filter(a => a.date === currDay).length;
  const onLeave = employees.filter(e => e.status === 'on-leave').length;
  const absent = totalEmployees - presentToday - onLeave;
  const lateToday = attendanceRecords.filter(a => a.date === currDay && a.status === 'late').length;

  return {
    totalEmployees,
    presentToday,
    absentToday: absent,
    lateToday,
    onLeave,
    presentPercentage: Math.round((presentToday / totalEmployees) * 100)
  };
};
