"use client";

import React from "react";

import { useUser } from "../user-provider";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  if (loading) {
    <div className="w-full h-screen flex justify-center items-center">
      Loading...
    </div>;
  }
  if (!loading && !user) {
    return redirect("/signin");
  }
  if (user?.role !== "ADMIN") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        You are not Authorized
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-zinc-100">
      <AdminSidebar />
      <main className="pl-57.25 pr-6 py-6">
        <div className="flex items-start justify-end pb-6">
          <div className="size-9 overflow-hidden rounded-full bg-zinc-300" />
        </div>
        {children}
      </main>
    </div>
  );
}
