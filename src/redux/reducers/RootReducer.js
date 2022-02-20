import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { browsePostReducer } from "./BrowsePostReducer";
import { postReducer } from "./PostReducer";
import { UIReducer } from "./UIReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
    ui: UIReducer,
    postDetails: browsePostReducer
});

export default rootReducer;