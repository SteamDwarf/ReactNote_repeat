import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import AppRoute from "./components/AppRoute";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import PostDetails from "./pages/PostDetails";
import Posts from "./pages/Posts";
import UserInformation from "./pages/UserInformation";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Header />
        <AppRoute />           
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
