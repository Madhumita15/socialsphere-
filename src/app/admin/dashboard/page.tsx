
"use client";
import AdminDashboard from '@/components/AdminDashboard';
import ModeratorDashboard from '@/components/ModeratorDashboard';
import { useAuthStore } from '@/store/useAuthStore'


const Dasboard = () => {
  const {role} = useAuthStore();
  return role === "admin" ? <AdminDashboard/> : <ModeratorDashboard/>
}

export default Dasboard
