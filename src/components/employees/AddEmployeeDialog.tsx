
import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Employee } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddEmployeeDialogProps {
  onEmployeeAdded: (employee: Employee) => void;
}

// Define a type for the form with the correct status type
type EmployeeFormState = {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  salary: string;
  status: Employee['status']; // Use the type from Employee
  password: string; // Added password field for creating auth user
};

const defaultForm: EmployeeFormState = {
  name: '',
  position: '',
  department: '',
  email: '',
  phone: '',
  avatar: '', // If left empty, you can assign a default later
  joinDate: new Date().toISOString().split("T")[0],
  salary: '',
  status: 'active',
  password: 'defaultPassword123' // Default password for new users
};

export function AddEmployeeDialog({ onEmployeeAdded }: AddEmployeeDialogProps) {
  const [form, setForm] = useState<EmployeeFormState>(defaultForm);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  };

  const handleStatusChange = (value: string) => {
    // Ensure status is one of the allowed values
    const status = (["active", "inactive", "on-leave"].includes(value) 
      ? value 
      : "active") as Employee["status"];
      
    setForm(f => ({
      ...f,
      status
    }));
  };

  const createAuthUser = async (email: string, password: string) => {
    try {
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            employee_id: null, // Will be updated after employee is created
          }
        }
      });

      if (authError) {
        throw authError;
      }

      return authUser.user?.id;
    } catch (error) {
      console.error("Error creating auth user:", error);
      throw error;
    }
  };

  const assignUserRole = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert([{ user_id: userId, role: "employee" }]);

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error("Error assigning user role:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // minimal validation
    if (!form.name || !form.email) {
      toast({ title: "Name and Email are required.", variant: "destructive" });
      setLoading(false);
      return;
    }
    
    try {
      // 1. Create Auth User
      const userId = await createAuthUser(form.email, form.password);

      if (!userId) {
        toast({ 
          title: "Failed to create user account", 
          description: "Could not create authentication account", 
          variant: "destructive" 
        });
        setLoading(false);
        return;
      }

      // 2. Create the employee object to insert, making sure to match database column names
      const employeeToInsert = {
        name: form.name,
        position: form.position,
        department: form.department,
        email: form.email,
        phone: form.phone || null,
        salary: Number(form.salary) || 0,
        // If avatar is blank, provide a fallback
        avatar: form.avatar || "/placeholder.svg",
        joindate: form.joinDate, // Match the database column name (lowercase)
        status: form.status
      };
      
      // 3. Insert employee to Supabase
      const { data, error } = await supabase
        .from("employees")
        .insert([employeeToInsert])
        .select();
        
      if (error) {
        console.error("Error creating employee:", error);
        toast({ title: "Error creating employee", description: error.message, variant: "destructive" });
      } else if (data && data[0]) {
        // 4. Assign user role
        await assignUserRole(userId);
        
        // Convert the database format to our TypeScript type format
        const newEmployee: Employee = {
          ...data[0],
          joinDate: data[0].joindate, // Map joindate back to joinDate for our app
          // Ensure status is one of the allowed values
          status: (["active", "inactive", "on-leave"].includes(data[0].status)
            ? data[0].status
            : "inactive") as Employee["status"]
        };
        console.log("Employee created:", newEmployee);
        toast({ 
          title: "Success", 
          description: "Employee account created! They can now log in with their email and the default password.", 
          duration: 5000 
        });
        onEmployeeAdded(newEmployee);
        setOpen(false);
        setForm(defaultForm);
      }
    } catch (e) {
      console.error("Exception when creating employee:", e);
      toast({ 
        title: "Failed to create employee", 
        description: "An unexpected error occurred", 
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={form.name} onChange={handleInput} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" value={form.email} onChange={handleInput} required />
          </div>
          <div>
            <Label htmlFor="password">Default Password</Label>
            <Input name="password" type="password" value={form.password} onChange={handleInput} required />
            <p className="text-xs text-gray-500 mt-1">
              Employee will use this password to log in for the first time.
            </p>
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input name="position" value={form.position} onChange={handleInput} />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input name="department" value={form.department} onChange={handleInput} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input name="phone" value={form.phone} onChange={handleInput} />
          </div>
          <div>
            <Label htmlFor="salary">Salary</Label>
            <Input name="salary" type="number" value={form.salary} onChange={handleInput} />
          </div>
          <div>
            <Label htmlFor="joinDate">Join Date</Label>
            <Input name="joinDate" type="date" value={form.joinDate} onChange={handleInput} />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status" value={form.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="avatar">Avatar URL (optional)</Label>
            <Input name="avatar" value={form.avatar} onChange={handleInput} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
