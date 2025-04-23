
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

const defaultForm = {
  name: '',
  position: '',
  department: '',
  email: '',
  phone: '',
  avatar: '', // If left empty, you can assign a default later
  joinDate: new Date().toISOString().split("T")[0],
  salary: '',
  status: 'active' as const
};

export function AddEmployeeDialog({ onEmployeeAdded }: AddEmployeeDialogProps) {
  const [form, setForm] = useState(defaultForm);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // minimal validation
    if (!form.name || !form.email) {
      toast({ title: "Name and Email are required.", variant: "destructive" });
      setLoading(false);
      return;
    }
    const employeeToInsert = {
      ...form,
      salary: Number(form.salary) || 0,
      // If avatar is blank, provide a fallback
      avatar: form.avatar || "/placeholder.svg",
      joindate: form.joinDate, // Match database column name
    };
    
    try {
      // Insert employee to Supabase
      const { data, error } = await supabase
        .from("employees")
        .insert([employeeToInsert])
        .select();
        
      if (error) {
        console.error("Error creating employee:", error);
        toast({ title: "Error creating employee", description: error.message, variant: "destructive" });
      } else if (data && data[0]) {
        // Convert the database format to our TypeScript type format
        const newEmployee: Employee = {
          ...data[0],
          joinDate: data[0].joindate, // Map joindate to joinDate
          // Ensure status is one of the allowed values
          status: (["active", "inactive", "on-leave"].includes(data[0].status)
            ? data[0].status
            : "inactive") as Employee["status"]
        };
        console.log("Employee created:", newEmployee);
        toast({ title: "Success", description: "Employee created!" });
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
