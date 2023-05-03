import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import DrugList from './components/DrugList';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? <DrugList /> : <LoginForm onLogin={handleLogin} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
