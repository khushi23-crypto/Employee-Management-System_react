import React from 'react'

const TaskList = ({data}) => {
    return (
        <div id='tasklist' className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap py-5 w-full p-5  mt-10'>
            <div className=' flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>High</h3>
                    <h4 className='text-sm'>07-sep-2025</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex quo ratione sapiente reprehenderit! Unde.</p>
            </div>
            <div className=' flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <h3 className='bg-blue-600 text-sm px-3 py-1 rounded'>High</h3>
                    <h4 className='text-sm'>07-sep-2025</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex quo ratione sapiente reprehenderit! Unde.</p>
            </div>
            <div className=' flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <h3 className='bg-green-600 text-sm px-3 py-1 rounded'>High</h3>
                    <h4 className='text-sm'>07-sep-2025</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex quo ratione sapiente reprehenderit! Unde.</p>
            </div>
            <div className=' flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <h3 className='bg-yellow-600 text-sm px-3 py-1 rounded'>High</h3>
                    <h4 className='text-sm'>07-sep-2025</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex quo ratione sapiente reprehenderit! Unde.</p>
            </div>
            <div className=' flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <h3 className='bg-emerald-300 text-sm px-3 py-1 rounded'>High</h3>
                    <h4 className='text-sm'>07-sep-2025</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex quo ratione sapiente reprehenderit! Unde.</p>
            </div>
            <div className=' flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <h3 className='bg-blue-300 text-sm px-3 py-1 rounded'>High</h3>
                    <h4 className='text-sm'>07-sep-2025</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex quo ratione sapiente reprehenderit! Unde.</p>
            </div>
            

        </div>
    )
}

export default TaskList