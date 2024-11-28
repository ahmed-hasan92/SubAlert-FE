import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { useEffect, useState } from 'react';
import { checkToken } from './api/auth';
import UserContext from './context/UserContext';

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const validToken = checkToken();

    setUser(validToken);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
