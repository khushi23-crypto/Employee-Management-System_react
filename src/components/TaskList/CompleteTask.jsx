import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { updateEmployee } from "../../utils/api";

const CompleteTask = ({ data, employeeId, token }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleUndo = async () => {
    try {
      const updatedTask = {
        ...data,
        completed: false,
        active: true,
      };

      // Update backend
      await updateEmployee(employeeId, { task: updatedTask }, token);

      // Update local context
      const updatedUsers = userData.map((user) =>
        user.id === employeeId
          ? {
              ...user,
              tasks: user.tasks.map((t) =>
                t.taskTitle === data.taskTitle ? updatedTask : t
              ),
            }
          : user
      );

      setUserData(updatedUsers);
    } catch (err) {
      console.error("Failed to revert task:", err);
    }
  };

  if (!data) return null;

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-[#1f2937] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="bg-blue-600 text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-sm text-gray-300">{data.taskDate}</h4>
      </div>

      <h2 className="mt-4 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2 text-gray-300 line-clamp-3">
        {data.taskDescription}
      </p>

      <div className="mt-6">
        <button
          className="w-full bg-green-500 hover:bg-green-600 rounded font-medium py-2 px-2 text-sm transition"
          onClick={handleUndo}
        >
          ✅ Completed
        </button>
      </div>
    </div>
  );
};

export default CompleteTask;
