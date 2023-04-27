import { Form, Button } from "react-bootstrap";
import { useState } from "react";



// eslint-disable-next-line react/prop-types
const Loging = ({ setToken, setLoging }) => {

  const URL = "https://backend-dummy.hospitaldeespecialidades.com.sv"

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
      .then((res) => {
        if(res.status === 201) return res.json()
        throw new Error('Invalid credentials')
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.token))
        setLoging(true);
        setToken(res.token)
      })
      .catch((err) => console.log(err));
  }

  const handleUser = (e) => {
    setUser(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User</Form.Label>
          <Form.Control value={user} onChange={handleUser} type="text" placeholder="Enter user" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={handlePassword} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Loging;
