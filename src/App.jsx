import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Loging from './components/Loging'
import ListaMedicamentos from './components/ListaMedicamentos'

function App() {
  const [loging, setLoging] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoging(true);
      setToken(JSON.parse(localStorage.getItem("token")));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setLoging(true);
    }
  }, [token]);

  return (
    <>

      {loging ? <ListaMedicamentos token={token} /> : <Loging setLoging={setLoging} setToken={setToken} /> }
      
      
    </>
  )
}

export default App
