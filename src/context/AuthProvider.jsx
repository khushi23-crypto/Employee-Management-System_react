import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../utils/LocalStorage'


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const { employees, admin } = getLocalStorage()
    setUserData({ employees, admin })
  }, [])


  return (
    <div>
      <AuthContext.Provider value={"Kajal"}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider