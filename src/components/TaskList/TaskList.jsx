import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    return (
        <div id='tasklist' className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap py-5 w-full p-5  mt-10'>
            {data.tasks.map((elem, idx) =>{
                if (elem.active) {
                    return <AcceptTask key={idx}/>
                }
                if (elem.new_task) {
                    return <NewTask  key={idx}/>
                }
                if(elem.completed){
                    return <CompleteTask  key={idx}/>
                }
                if(elem.failed){
                    return <FailedTask  key={idx}/>
                }
            })}
        </div>
    )
}

export default TaskList