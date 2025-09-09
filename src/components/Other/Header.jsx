import React from 'react'
import { setLocalStorage } from '../../utils/localStorage'

const Header = (props) => {
  

    const logOutUser=()=>{
      localStorage.setItem('loggedInUser','')
      props.changeUser('')
      //window.location.reload()
    }
  return (
    <>
    <div className='flex items-end justify-between'>
        <h1 className='text-2xl text-white font-medium'>Hello <br/><span className='text-3xl font-semibold'>{props.data?.firstname || "Admin"}  👋</span></h1>
        <button className='bg-red-600 text-lg font-medium text-white px-4 py-2 rounded-sm' onClick={logOutUser}>Log Out</button>
    </div>
    </>
  )
}

export default Header