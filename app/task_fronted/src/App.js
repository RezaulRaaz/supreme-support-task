import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import EditData from './components/EditData';
import Details from './components/Details';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditData />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <ToastContainer />

    </>
  );
}

export default App;
