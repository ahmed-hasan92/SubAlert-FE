import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { useEffect, useState } from 'react';
import { checkToken } from './api/auth';
import UserContext from './context/UserContext';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './components/Layout';

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
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
