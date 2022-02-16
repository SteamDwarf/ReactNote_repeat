import { BrowserRouter} from "react-router-dom";
import { useEffect, useState } from "react";
import AppRoute from "./components/AppRoute";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import { getUserById } from "./API/UserService";
import { useFetching } from "./hooks/useFetching";
import { PostsConfContext } from "./context/PostsConfContext";
import { setCurrentUserAction, signInAction } from "./redux/AuthReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [fetchUser] = useFetching(async () => {
    const userId = localStorage.getItem('userId');

    if(userId.length > 0) {
      const user = await getUserById(userId);
      
      dispatch(setCurrentUserAction(user.data));
      dispatch(signInAction());
    }
  });

  useEffect(fetchUser, []);

  return (
    <AuthContext.Provider value={{
      /* currentUser, 
      setCurrentUser */
    }}>
      <PostsConfContext.Provider value={{
        /* curSortOption, 
        setCurSortOption,
        postsLimit, 
        setpostsLimit */
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
