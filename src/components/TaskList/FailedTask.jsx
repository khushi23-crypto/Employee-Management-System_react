import React from 'react'

const FailedTask = () => {
  return (
    <div className=' flex-shrink-0 h-full w-[300px] bg-yellow-400 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <h3 className='bg-yellow-600 text-sm px-3 py-1 rounded'>High</h3>
                    <h4 className='text-sm'>07-sep-2025</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex quo ratione sapiente reprehenderit! Unde.</p>
                <div className='mt-2'>
                    <button className='w-full'>
                        Failed
                    </button>
                </div>
            </div>
  )
}

export default FailedTask