import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { postReducer } from "./PostReducer";
import { UIReducer } from "./UIReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
    ui: UIReducer
});

export default rootReducer;