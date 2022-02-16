import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./AuthReducer";
import { postReducer } from "./PostReducer";
import { UIReducer } from "./UIReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
    ui: UIReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;