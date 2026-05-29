"use client";

import React from "react";

import { useUser } from "../user-provider";
import { redirect } from "next/navigation";
import { AppSidebar } from "./sidebar";

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
      <AppSidebar />
      {children}
    </div>
  );
}
