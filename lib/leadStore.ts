import { create } from "zustand";
import apiClient from "./apiClient";

interface Lead {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  status: string;
  assignedTo?: { name: string; role: string };
  createdBy?: { name: string; role: string };
}

interface LeadState {
  leads: Lead[];
  loading: boolean;
  fetchLeads: (params?: { search?: string }) => Promise<void>;
  addLead: (leadData: Partial<Lead>) => Promise<void>;
  assignLead: (leadId: string, userId: string) => Promise<void>;
  deleteLead: (leadId: string) => Promise<void>;
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],
  loading: false,

  fetchLeads: async ({ search = "" } = {}) => {
    set({ loading: true });
    try {
      const res = await apiClient.get("/lead", {
        params: { search },
      });
      set({ leads: res.data });
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      set({ loading: false });
    }
  },

  addLead: async (leadData) => {
    try {
      const res = await apiClient.post("/lead", leadData);
      set({ leads: [res.data.lead, ...get().leads] });
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  },

  assignLead: async (leadId, userId) => {
    try {
      const res = await apiClient.put("/lead/assign", { leadId, userId });
      set({
        leads: get().leads.map((l) => (l._id === leadId ? res.data.lead : l)),
      });
    } catch (error) {
      console.error("Error assigning lead:", error);
    }
  },

  deleteLead: async (leadId) => {
    try {
      await apiClient.delete(`/lead/${leadId}`);
      set({ leads: get().leads.filter((l) => l._id !== leadId) });
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  },
}));
