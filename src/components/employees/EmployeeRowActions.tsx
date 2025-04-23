
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Employee } from "@/lib/types";

interface EmployeeRowActionsProps {
  employee: Employee;
  onStatusChange: (id: string, status: Employee["status"]) => void;
}

export function EmployeeRowActions({ employee, onStatusChange }: EmployeeRowActionsProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const toggleActive = async () => {
    setLoading(true);
    const newStatus = employee.status === "active" ? "inactive" : "active";
    
    try {
      const { error } = await supabase
        .from("employees")
        .update({ status: newStatus })
        .eq("id", employee.id);
        
      if (error) {
        console.error("Error updating status:", error);
        toast({ title: "Status Update Failed", description: error.message, variant: "destructive" });
      } else {
        onStatusChange(employee.id, newStatus as Employee['status']);
        toast({
          title: `Employee ${newStatus === "active" ? "Activated" : "Inactivated"}`,
          description: `${employee.name} is now ${newStatus}.`
        });
      }
    } catch (e) {
      console.error("Exception when updating status:", e);
      toast({ 
        title: "Failed to update status", 
        description: "An unexpected error occurred", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant={employee.status === "active" ? "destructive" : "outline"}
      size="sm"
      onClick={toggleActive}
      disabled={loading}
    >
      {loading
        ? "Updating..."
        : employee.status === "active"
        ? "Inactivate"
        : "Activate"}
    </Button>
  );
}
