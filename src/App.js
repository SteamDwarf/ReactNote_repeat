import { BrowserRouter} from "react-router-dom";
import { useEffect, useState } from "react";
import AppRoute from "./components/AppRoute";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import { getUserById } from "./API/UserService";
import { useFetching } from "./hooks/useFetching";
import { PostsConfContext } from "./context/PostsConfContext";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [curSortOption, setCurSortOption] = useState('title');
  const [postsLimit, setpostsLimit] = useState('10');
  const [fetchUser] = useFetching(async () => {
    const userId = localStorage.getItem('userId');

    if(userId.length > 0) {
      const user = await getUserById(userId);
      
      setCurrentUser(user.data);
      setIsAuth(true);
    }
  });

  useEffect(fetchUser, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      currentUser, 
      setCurrentUser
    }}>
      <PostsConfContext.Provider value={{
        curSortOption, 
        setCurSortOption,
        postsLimit, 
        setpostsLimit
      }}>
        <BrowserRouter>
          <Header />
          <AppRoute />           
        </BrowserRouter>
      </PostsConfContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
