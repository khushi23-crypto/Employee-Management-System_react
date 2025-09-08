import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthProvider';


function App() {

  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const authData = useContext(AuthContext)
  
  useEffect(()=>{
    const loggedInUser=localStorage.getItem('loggedInUser')
  })

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    }

    else if (authData) {
      const employee = authData.employees.find((e) => email === e.email && e.password === password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee' }))
      }

    }
    else {
      alert('Invalid Credentials')
    }
  }

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user === 'admin' ? <AdminDashboard /> :(user === 'employee' ?<EmployeeDashboard data={loggedInUserData}/> : null )}
    </>
  );
}

export default App;
