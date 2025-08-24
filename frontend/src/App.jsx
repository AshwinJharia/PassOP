import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Manager from './components/Manager';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Navbar />
      <Manager />
      <Footer />
    </AuthProvider>
  );
}

export default App;
