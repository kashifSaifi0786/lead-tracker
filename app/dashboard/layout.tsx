"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   useAuthRedirect();
  const { logout } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-semibold">Lead Tracker</h2>
        <nav className="space-y-3 flex flex-col">
          <Link href="/dashboard">🏠 Dashboard</Link>
          <Link href="/dashboard/users">👥 Users</Link>
          <Link href="/dashboard/leads">📋 Leads</Link>
        </nav>
        <Button variant="secondary" className="mt-6" onClick={handleLogout}>
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
