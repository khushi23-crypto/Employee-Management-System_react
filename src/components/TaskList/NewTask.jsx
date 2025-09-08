import React from 'react'

const NewTask = () => {
  return (
     <div className=' flex-shrink-0 h-full w-[300px] bg-green-400 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <h3 className='bg-blue-600 text-sm px-3 py-1 rounded'>High</h3>
                    <h4 className='text-sm'>07-sep-2025</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex quo ratione sapiente reprehenderit! Unde.</p>
                <div className=' mt-4 '>
                <button className='bg-green-500 py- px-2 text-sm'>Accept Task</button>
                </div>
            </div>
  )
}

export default NewTask