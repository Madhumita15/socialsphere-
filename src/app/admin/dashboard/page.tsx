"use client";
import AdminDashboard from "@/components/AdminDashboard";
import ModeratorDashboard from "@/components/ModeratorDashboard";
import { useAuthStore } from "@/store/useAuthStore";
import { useSyncExternalStore } from "react";

const Dasboard = () => {
  const { role } = useAuthStore();
  function useIsClinet() {
    return useSyncExternalStore(
      () => () => {},
      () => true,
      () => false,
    );
  }

  const isClient = useIsClinet();
  if (!isClient) return null;

  return isClient && role === "admin"  ? (
    <AdminDashboard />
  ) : (
    <ModeratorDashboard />
  );
};

export default Dasboard;
