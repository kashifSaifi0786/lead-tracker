"use client";

import React, { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuthStore } from "@/lib/store/authStore";
import api from "@/lib/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, BarChart, Zap } from "lucide-react";
import apiClient from "@/lib/apiClient";

interface Stats {
  totalUsers: number;
  totalLeads: number;
  activeUsers: number;
}

export default function DashboardPage() {
  const { token } = useAuthStore();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    totalLeads: 0,
  });

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const { data } = await apiClient.get("/dashboard/stats");
      setStats(data.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  useEffect(() => {
    if (token) fetchStats();
  }, [token]);

  const cardData = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-indigo-600",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: BarChart,
      color: "text-yellow-600",
    },
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Zap,
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <Card key={card.title} className="shadow-lg border-none">
            <CardHeader className="flex items-center justify-between">
              <card.icon className={`w-6 h-6 ${card.color}`} />
              <span className="text-gray-500 text-sm">{card.title}</span>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for future charts or modules */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center text-gray-500">
        More dashboard components coming soon...
      </div>
    </div>
  );
}
