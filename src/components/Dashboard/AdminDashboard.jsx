import React, { useEffect, useState } from "react";
import Header from "../Other/Header";
import CreateTask from "../Other/CreateTask";
import AllTask from "../Other/AllTask";
import { fetchEmployees } from "../../utils/api";

const AdminDashboard = ({ changeUser }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch employees (or tasks) from backend
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await fetchEmployees(token);
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="min-h-screen w-full p-7 bg-gray-950 text-white">
      <Header changeUser={changeUser} />
      <CreateTask onTaskCreated={loadEmployees} />
      {loading ? (
        <p className="text-center mt-10 text-gray-400">Loading employees...</p>
      ) : (
        <AllTask employees={employees} />
      )}
    </div>
  );
};

export default AdminDashboard;
