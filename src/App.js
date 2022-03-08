import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/react-datepicker/dist/react-datepicker.min.css";
import { useEffect, useState } from 'react'
import Navbar from './components/navbar/LMSNavbar'
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import ForgotPassword from './components/password/ForgotPassword'
import ResetPassword from './components/password/ResetPassword'
import Home from './components/home/Home';
import AdminSlideNav from './components/admin/SlideNav'
import AdminDashboard from './components/admin/Dashboard'
import AddBook from './components/admin/Addbook'
import AdminLogout from './components/admin/Logout';
import AdminAccount from './components/admin/Account'
import AdminBooks from './components/admin/Books'
import AdminDeletedBooks from './components/admin/DeletedBooks'
import Users from './components/admin/GetUsers'
import AdminOrders from './components/admin/Orders'
import UserAccount from './components/user/Account'
import UserBooks from './components/user/Books'
import UserOrders from './components/user/Orders'
import UserLogout from './components/user/Logout'
import ErrorPage from './components/notFound/404'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminToken } from './components/properties/Properties'
import IdleMonitor from './components/IdleMonitor/IdleMonitor';
const Routing = () => {
  return (
    <Routes >
      <Route path='/' exact element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/admin/add-book' element={<AddBook />} />
      <Route path='/admin/account' element={<AdminAccount />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/users' element={<Users />} />
      <Route path='/admin/logout' element={<AdminLogout />} />
      <Route path='/admin/books' element={<AdminBooks />} />
      <Route path='/admin/deleted-books' element={<AdminDeletedBooks />} />
      <Route path='/admin/orders' element={<AdminOrders />} />
      <Route path='/user/account' element={<UserAccount />} />
      <Route path='/user/books' element={<UserBooks />} />
      <Route path='/user/orders' element={<UserOrders />} />
      <Route path='/user/logout' element={<UserLogout />} />
      <Route path='*' element={<ErrorPage />} />
      {/* <Route path='/account' component={() => <Account user={user} mode={mode} />} /> */}
    </Routes>
  )
}
function App() {
  const [role, setRole] = useState('user')
  useEffect(() => {
    if (adminToken) {
      setRole('admin')
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='row'>
        {
          role === 'admin' ? (<>
            <div className='col-md-3'>
              <AdminSlideNav />
            </div>
            <div className='col-md-9'>
              <Routing />
            </div></>) : (<>
              <Routing />
            </>)
        }
      </div>
      {
        adminToken ? <IdleMonitor /> : ""
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div >
  );
}

export default App;
