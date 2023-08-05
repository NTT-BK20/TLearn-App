import { Container } from 'react-bootstrap';
import './App.scss';
import Home from './route/Home'
import Header from './route/Header'
import TableUsers from './route/TableUsers';
import Login from './route/Login'
import { Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <div className='app-container'>
      <Header />
      <Container>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/khoahoc" element={<TableUsers />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
  );
}

export default App;
