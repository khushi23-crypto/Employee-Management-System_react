import React from 'react'

const TaskListNumber = ({ data }) => {
  return (
    <div className="flex flex-wrap mt-10 justify-between gap-5">
      <div className="flex-1 min-w-[200px] py-6 px-9 bg-red-400 rounded-xl text-white">
        <h2 className="text-3xl font-semibold">{data?.taskNumbers?.new_task || 0}</h2>
        <h3 className="text-xl font-medium">New Tasks</h3>
      </div>

      <div className="flex-1 min-w-[200px] py-6 px-9 bg-blue-400 rounded-xl text-white">
        <h2 className="text-3xl font-semibold">{data?.taskNumbers?.completed || 0}</h2>
        <h3 className="text-xl font-medium">Completed</h3>
      </div>

      <div className="flex-1 min-w-[200px] py-6 px-9 bg-green-400 rounded-xl text-white">
        <h2 className="text-3xl font-semibold">{data?.taskNumbers?.failed || 0}</h2>
        <h3 className="text-xl font-medium">Failed</h3>
      </div>

      <div className="flex-1 min-w-[200px] py-6 px-9 bg-yellow-400 rounded-xl text-white">
        <h2 className="text-3xl font-semibold">{data?.taskNumbers?.active || 0}</h2>
        <h3 className="text-xl font-medium">Active</h3>
      </div>
    </div>
  )
}

export default TaskListNumber
