import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import statusReducer from "./statusReducer";
import itemReducer from "./itemReducer";
import formReducer from "./formReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
    login:loginReducer,
    statusLoad: statusReducer,
    itemsData: itemReducer,
    formData: formReducer,
    category: categoryReducer
});