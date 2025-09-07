import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage';

function App() {


  useEffect(() => {
    //setLocalStorage() 
    getLocalStorage()
  },)
  
  return (
    <>
      <Login />
     {/*  <EmployeeDashboard/> */}
    {/*  <AdminDashboard/> */}
    </>
  );
}

export default App;
