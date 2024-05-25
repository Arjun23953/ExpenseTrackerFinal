import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user) {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      setIsAuthenticated(false);
      navigate('/sign');
    }
    setLoading(false); // Authentication check completed
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <AppStyled className="App">
      <Routes>
        {isAuthenticated ? (
          <>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="sign" element={<SignIn />} />
            <Route index element={<SignIn />} />
          </>
        )}
      </Routes>
    </AppStyled>
  );
}

function Home() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <MainLayout>
      <Navigation active={active} setActive={setActive} />
      <main>{displayData()}</main>
    </MainLayout>
  );
}

const AppStyled = styled.div`
  height: 100vh;

  main {
    flex: 1;

    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);

    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
