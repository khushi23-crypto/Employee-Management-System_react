import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';

function App() {
  return (
    <>
      {/* <Login /> */}
     {/*  <EmployeeDashboard/> */}
     <AdminDashboard/>
    </>
  );
}

export default App;
