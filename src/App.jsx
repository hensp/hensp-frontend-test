import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Loging from './components/Loging'
import ListaMedicamentos from './components/ListaMedicamentos'
const URL = "https://backend-dummy.hospitaldeespecialidades.com.sv"
function App() {
  const [loging, setLoging] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      usuario: user,
      password: password,
    };
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(data)
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    console.log(data)
    fetch(`${URL}/api/auth/login`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.token))
        setLoging(true);
        setToken(res.token)
        console.log(res);
        if (res.status === 200) {
          setToken(res.token)
        }
      })
      .catch((err) => console.log(err));
  }

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

      {loging ? <ListaMedicamentos token={token} /> : <Loging handleSubmit={handleSubmit} user={user} password={password} setUser={setUser} setPassword={setPassword}/> }
      
      
    </>
  )
}

export default App
