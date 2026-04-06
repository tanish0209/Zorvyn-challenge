import React from "react";

export enum Role {
  VIEWER = "VIEWER",
  ANALYST = "ANALYST",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

interface UserManagementProps {
  users: User[];
  fetching: boolean;
  onUpdateRole: (userId: string, newRole: Role) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  fetching,
  onUpdateRole,
}) => {
  return (
    <div className="mt-12">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black">
              <th className="pb-4 text-sm font-semibold text-black">User</th>
              <th className="pb-4 text-sm font-semibold text-black">Email</th>
              <th className="pb-4 text-sm font-semibold text-black">Role</th>
              <th className="pb-4 text-sm font-semibold text-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {!fetching && users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td className="py-6 flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-black/5 text-sm font-bold text-black uppercase">
                      {u.name.substring(0, 2)}
                    </div>
                    <span className="text-sm font-semibold text-black">{u.name}</span>
                  </td>
                  <td className="py-6 text-sm text-slate-600">{u.email}</td>
                  <td className="py-6">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${u.role === Role.ADMIN
                        ? "bg-black text-white"
                        : u.role === Role.ANALYST
                          ? "bg-black/10 text-black"
                          : "bg-black/5 text-slate-500"
                        }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <select
                      className="bg-transparent text-xs font-bold uppercase tracking-widest border border-black/10 rounded-lg p-2 focus:border-black outline-none"
                      value={u.role}
                      onChange={(e) => onUpdateRole(u.id, e.target.value as Role)}
                    >
                      <option value={Role.VIEWER}>Viewer</option>
                      <option value={Role.ANALYST}>Analyst</option>
                      <option value={Role.ADMIN}>Admin</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : fetching ? (
              <tr>
                <td colSpan={4} className="py-20 text-center text-slate-400">
                  Loading users...
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4} className="py-20 text-center text-slate-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
