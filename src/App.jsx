import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { auth } from './firebase/firebase';
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router';
import { EditProvider } from './context/React/EditContext.jsx';
import { DeleteProvider } from './context/React/DeleteContext.jsx';



function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  //Identifying page reload for secure authentication

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setIsLogin(false);
      setIsSignup(false);
    }
    else {
      sessionStorage.setItem("hasVisited", "true");
    }

  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<> <Header setIsLogin={setIsLogin} setIsSignup={setIsSignup} isLogin={isLogin} isSignup={isSignup} />  <LandingPage setIsSignup={setIsSignup} isSigh
            ={isSignup} />  </>} />
          <Route path='/auth' element={<AuthPage isLogin={isLogin} isSignup={isSignup} setIsLogin={setIsLogin} setIsSignup={setIsSignup} />} />
          <Route path='/dashboard' element={<EditProvider> <DeleteProvider> <Dashboard /> </DeleteProvider>  </EditProvider>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
