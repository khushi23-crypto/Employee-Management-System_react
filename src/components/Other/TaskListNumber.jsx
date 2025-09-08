import React from 'react'

const TaskListNumber = ({data}) => {
    return (
        <div className='flex mt-10  justify-between gap-5'>
            <div className='p-10 w-[45%] py-6 px-9 bg-red-400 rounded-xl'>
                <h2 className='text-3xl font-semibold'>{data.taskNumbers.new_task}</h2>
                <h3 className='text-xl font-medium '>New Task</h3>
            </div>
             <div className='p-10 w-[45%] py-6 px-9 bg-blue-400 rounded-xl'>
                <h2 className='text-3xl font-semibold'>{data.taskNumbers.completed}</h2>
                <h3 className='text-xl font-medium '>Completed Task</h3>
            </div>
             <div className='p-10 w-[45%] py-6 px-9 bg-green-400 rounded-xl'>
                <h2 className='text-3xl font-semibold'>{data.taskNumbers.failed}</h2>
                <h3 className='text-xl font-medium '>Failed Task</h3>
            </div>
             <div className='p-10 w-[45%] py-6 px-9 bg-yellow-400 rounded-xl'>
                <h2 className='text-3xl font-semibold'>{data.taskNumbers.active}</h2>
                <h3 className='text-xl font-medium '>Accepted Task</h3>
            </div>
        </div>
    )
}

export default TaskListNumber