import React, { useEffect, useState } from "react";
import Header from "../Other/Header";
import TaskListNumber from "../Other/TaskListNumber";
import TaskList from "../TaskList/TaskList";
import { fetchEmployees } from "../../utils/api";

const EmployeeDashboard = ({ changeUser, data }) => {
  const [tasks, setTasks] = useState([]); // employee-specific data
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch only this employee’s data (optional — depends on backend design)
  const loadEmployeeData = async () => {
    try {
      setLoading(true);
      if (!data?.email) return;
      const employees = await fetchEmployees(token);

      // Filter to only show the logged-in employee’s info
      const userData = employees.find(
        (emp) => emp.email.toLowerCase() === data.email.toLowerCase()
      );
      if (userData) setTasks([userData]);
    } catch (err) {
      console.error("Error fetching employee data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployeeData();
  }, [data]);

  return (
    <div className="p-10 bg-[#1C1C1C] min-h-screen text-white">
      <Header changeUser={changeUser} data={data} />
      {loading ? (
        <p className="text-center text-gray-400 mt-10">
          Loading your details...
        </p>
      ) : (
        <>
          <TaskListNumber data={tasks} />
          <TaskList data={tasks} />
        </>
      )}
    </div>
  );
};

export default EmployeeDashboard;
