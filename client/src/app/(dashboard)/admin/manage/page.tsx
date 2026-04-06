"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import UserManagement, { Role } from "@/components/dashboard/UserManagement";

export default function AdminManage() {
  const { token } = useAuth();
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsersList = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setFetchingUsers(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsersList();
    }
  }, [token]);

  const handleUpdateUserRole = async (userId: string, role: Role) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/${userId}`, { role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsersList();
    } catch (err) {
      console.error("Update role failed:", err);
    }
  };

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold tracking-tighter text-black">Access Management</h1>
        <p className="text-xl text-slate-500">Control system access and assign administrative roles.</p>
      </div>

      <UserManagement
        users={users}
        fetching={fetchingUsers}
        onUpdateRole={handleUpdateUserRole}
      />
    </div>
  );
}
