import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { updateEmployee } from "../../utils/api";

const AcceptTask = ({ data, employeeId, token }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleStatusChange = async (status) => {
    try {
      // Update local state immediately for better UX
      const updatedTask = { ...data, active: false, completed: false, failed: false, [status]: true };

      // Update backend
      await updateEmployee(employeeId, { task: updatedTask }, token);

      // Update global context (client-side)
      const updatedUsers = userData.map((user) => {
        if (user.id === employeeId) {
          return {
            ...user,
            tasks: user.tasks.map((t) =>
              t.taskTitle === data.taskTitle ? updatedTask : t
            ),
          };
        }
        return user;
      });

      setUserData(updatedUsers);
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  if (!data) return null;

  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-[#222] text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="bg-yellow-600 text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-sm text-gray-300">{data.taskDate}</h4>
      </div>

      <h2 className="mt-4 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2 text-gray-300 line-clamp-3">
        {data.taskDescription}
      </p>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleStatusChange("completed")}
          className="bg-green-500 hover:bg-green-600 rounded font-medium py-1 px-2 text-sm transition"
        >
          Mark as Completed
        </button>
        <button
          onClick={() => handleStatusChange("failed")}
          className="bg-red-500 hover:bg-red-600 rounded font-medium py-1 px-2 text-sm transition"
        >
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
