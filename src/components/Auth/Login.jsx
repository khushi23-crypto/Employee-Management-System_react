import React from 'react'
import { useState } from 'react'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("email is",email)
        console.log("password is",password)

        setEmail("")
        setPassword("")
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center '>
            <div className='border-2 border-emerald-600 p-20 rounded-xl'>
                <form
                    onSubmit={(e) => {
                        submitHandler(e)
                    }}
                    className='flex flex-col items-center justify-center'>

                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                         className='text-white outline-none bg-transparent border-2 border-emerald-600 rounded-full py-3 px-5 text-xl placeholder:text-gray-400  ' type='email' placeholder='Enter your email' />

                    <input
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        required
                         className='text-white outline-none bg-transparent border-2 border-emerald-600 rounded-full py-3 px-5 text-xl placeholder:text-gray-400 mt-4' type='password' placeholder='Enter Password' />
                    <button 
                    
                    className=' mt-5 text-white outline-none  border-2 bg-emerald-600 rounded-full py-3 px-5 text-xl placeholder:text-white  border-none'>Log in</button>
                </form>
            </div>

        </div>
    )
}

export default Login