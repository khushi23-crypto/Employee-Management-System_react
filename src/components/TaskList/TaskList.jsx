import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
  if (!data || !Array.isArray(data.tasks)) {
    return (
      <div className='h-[55%] flex items-center justify-center text-gray-400'>
        No tasks available
      </div>
    )
  }

  return (
    <div
      id='tasklist'
      className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap py-5 w-full px-5 mt-10 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'
    >
      {data.tasks.map((task, idx) => {
        if (task.active) return <AcceptTask key={idx} data={task} />
        if (task.new_task) return <NewTask key={idx} data={task} />
        if (task.completed) return <CompleteTask key={idx} data={task} />
        if (task.failed) return <FailedTask key={idx} data={task} />
        return null
      })}
    </div>
  )
}

export default TaskList
