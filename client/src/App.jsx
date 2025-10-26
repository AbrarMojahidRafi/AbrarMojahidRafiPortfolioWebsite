import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/contact';
import Service from './pages/Service';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Logout from './pages/Logout';
import AdminLayout from './components/layouts/AdminLayout'; 
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import AdminServices from './pages/AdminServices';
import AdminAboutMe from './pages/AdminAboutMe';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/about" element = {<About />} />
          <Route path="/contact" element = {<Contact />} />
          <Route path="/service" element = {<Service />} />
          <Route path="/register" element = {<Register />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/logout" element = {<Logout />} />
          <Route path="*" element = {<Error />} />
          <Route path="/admin" element = {<AdminLayout />}> 
            <Route path="users" element = {<AdminUsers />} />
            <Route path="contacts" element = {<AdminContacts />} />
            <Route path="services" element = {<AdminServices />} />
            <Route path="abouts" element = {<AdminAboutMe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
