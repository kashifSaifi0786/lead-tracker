// "use client";
// import { useEffect } from "react";
// import { useLeadStore } from "@/lib/leadStore";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2, Trash2, UserPlus, UserRoundCheck } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function LeadListPage() {
//   const router = useRouter();
//   const { leads, fetchLeads, deleteLead, loading, assignLead } = useLeadStore();

//   useEffect(() => {
//     if (!leads || leads.length === 0) {
//       fetchLeads();
//     }
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Leads</h2>
//         <Button onClick={() => router.push("/dashboard/leads/add")}>
//           <UserPlus className="w-4 h-4 mr-2" />
//           Add Lead
//         </Button>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-20">
//           <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
//         </div>
//       ) : leads.length === 0 ? (
//         <p className="text-gray-500 text-center">No leads found</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {leads.map((lead) => (
//             <Card
//               key={lead._id}
//               className="shadow-sm border hover:shadow-md transition"
//             >
//               <CardContent className="p-4">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-bold text-lg">{lead.name}</h3>
//                   <Button variant="outline" size="sm">
//                     <UserRoundCheck className="w-4 h-4" />
//                   </Button>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   {lead.email || "No email"}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {lead.phone || "No phone"}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Status: {lead.status}
//                 </p>

//                 <div className="mt-3 flex items-center justify-between">
//                   <span className="text-xs text-gray-500">
//                     Assigned to: {lead.assignedTo?.name || "Unassigned"}
//                   </span>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => deleteLead(lead._id)}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useLeadStore } from "@/lib/leadStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, UserPlus } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function LeadListPage() {
  const router = useRouter();
  const { leads, fetchLeads, deleteLead, assignLead, loading } = useLeadStore();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [assignableUsers, setAssignableUsers] = useState<
    { _id: string; name: string; role: string }[]
  >([]);
  const [selectedUser, setSelectedUser] = useState("");

  // 🔹 Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  // 🔹 Fetch leads (with search)
  useEffect(() => {
    fetchLeads({ search: debouncedSearch });
  }, [debouncedSearch]);

  const openAssignModal = async (leadId: string) => {
    setSelectedLeadId(leadId);
    // Fetch users that this lead can be assigned to
    const res = await apiClient.get("/users/assignable");
    setAssignableUsers(res.data);
    setShowAssignModal(true);
  };

  const handleAssign = async () => {
    if (selectedLeadId && selectedUser) {
      await assignLead(selectedLeadId, selectedUser);
      setShowAssignModal(false);
      setSelectedLeadId(null);
      setSelectedUser("");
      fetchLeads();
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">Leads</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
          <Button onClick={() => router.push("/dashboard/leads/add")}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        </div>
      ) : leads.length === 0 ? (
        <p className="text-gray-500 text-center">No leads found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads.map((lead) => (
            <Card
              key={lead._id}
              className="shadow-2xl backdrop-blur-lg bg-white/90 rounded-2xl border hover:shadow-lg transition"
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-bold">{lead.name}</h3>
                <p className="text-sm text-gray-600">
                  {lead.email || "No email"}
                </p>
                <p className="text-sm text-gray-600">
                  {lead.phone || "No phone"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Status: {lead.status}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Assigned to: {lead.assignedTo?.name || "Unassigned"}
                </p>

                <div className="mt-4 flex justify-between">
                  <Button size="sm" onClick={() => openAssignModal(lead._id)}>
                    Assign
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteLead(lead._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Card className="w-[380px] p-6 shadow-2xl bg-white/95 rounded-2xl">
            <CardContent>
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Assign Lead
              </h2>
              <Label>Select User</Label>
              <select
                className="w-full p-2 border rounded mt-1"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select a user</option>
                {assignableUsers.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>

              <div className="flex justify-end mt-6 space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAssign} disabled={!selectedUser}>
                  Assign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
