import { useEffect} from "react";
import AppRoute from "./pages/app-route/AppRoute";
import Header from "./components/header/Header";
import { getUserById } from "./API/UserService";
import { useFetching } from "./hooks/useFetching";
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
            <Header />
            <AppRoute />           
    </div>
  );
}

export default App;
