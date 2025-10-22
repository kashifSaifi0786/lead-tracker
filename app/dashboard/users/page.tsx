"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuthStore } from "@/lib/store/authStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function UsersPage() {
  useAuthRedirect();
  const { user } = useAuthStore();
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Record<string, string>>({});

  const fetchUsers = async () => {
    const [activeRes, inactiveRes] = await Promise.all([
      apiClient.get("/users/active"),
      apiClient.get("/users/inactive"),
    ]);
    setActiveUsers(activeRes.data);
    setInactiveUsers(inactiveRes.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const activateUser = async (id: string) => {
    const selectedRole = roles[id];
    if (!selectedRole) return alert("Select a role first!");

    try {
      await apiClient.put(`/users/activate/${id}`, { role: selectedRole });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await apiClient.delete(`/users/${id}`);
      toast.success("User deleted successfully");
      fetchUsers(); // refresh list
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">User Management</h1>

      {/* ACTIVE USERS */}
      <Card className="shadow-lg border-none">
        <CardHeader>
          <h2 className="text-xl font-semibold text-green-700">Active Users</h2>
        </CardHeader>
        <CardContent>
          {activeUsers.length === 0 ? (
            <p className="text-gray-500">No active users</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeUsers.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(user._id)}
                        className="ml-2"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* INACTIVE USERS (Superadmin only) */}
      {user?.role === "superadmin" && (
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-red-700">
              Inactive Users
            </h2>
          </CardHeader>
          <CardContent>
            {inactiveUsers.length === 0 ? (
              <p className="text-gray-500">No inactive users</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Assign Role</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inactiveUsers.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Select
                          onValueChange={(value) =>
                            setRoles((prev) => ({ ...prev, [u._id]: value }))
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="teamlead">Team Lead</SelectItem>
                            <SelectItem value="agent">Agent</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => activateUser(u._id)}
                          className="bg-green-600 text-white"
                        >
                          Activate
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(user._id)}
                          className="ml-2"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
