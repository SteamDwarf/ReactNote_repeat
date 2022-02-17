import { BrowserRouter} from "react-router-dom";
import { useEffect, useState } from "react";
import AppRoute from "./components/AppRoute";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import { getUserById } from "./API/UserService";
import { useFetching } from "./hooks/useFetching";
import { PostsConfContext } from "./context/PostsConfContext";
import { setCurrentUserAction, signInAction } from "./redux/reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import './styles/themes/components/app.scss';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.ui);
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
    <div className={`app ${theme}`}>
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
    </div>
  );
}

export default App;
