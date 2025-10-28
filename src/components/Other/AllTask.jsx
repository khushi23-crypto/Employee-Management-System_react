import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { fetchEmployees } from "../../utils/api";

const AllTask = () => {
  const [userData] = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
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

    loadEmployees();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-10">Loading employees...</div>
    );
  }

  if (!employees.length) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No employees found.
      </div>
    );
  }

  return (
    <div className="bg-[#1c1c1c] p-5 mt-5 rounded">
      <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
        <h2 className="text-lg font-medium w-1/5">Employee Name</h2>
        <h3 className="text-lg font-medium w-1/5">Email</h3>
        <h5 className="text-lg font-medium w-1/5">Position</h5>
        <h5 className="text-lg font-medium w-1/5">Salary</h5>
        <h5 className="text-lg font-medium w-1/5">Created At</h5>
      </div>

      <div>
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded"
          >
            <h2 className="text-lg font-medium w-1/5">{emp.name}</h2>
            <h3 className="text-lg font-medium w-1/5 text-blue-400">
              {emp.email}
            </h3>
            <h5 className="text-lg font-medium w-1/5 text-yellow-300">
              {emp.position || "—"}
            </h5>
            <h5 className="text-lg font-medium w-1/5 text-white">
              ₹{emp.salary ?? 0}
            </h5>
            <h5 className="text-lg font-medium w-1/5 text-gray-400">
              {new Date(emp.created_at).toLocaleDateString()}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
