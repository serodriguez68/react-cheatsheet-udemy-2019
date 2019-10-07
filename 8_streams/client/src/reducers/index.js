import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";

// We have to to assign the redux-form reducer to the 'form' key
export default combineReducers({
    auth: authReducer,
    form: formReducer
});