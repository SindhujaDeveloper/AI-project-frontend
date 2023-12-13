import { combineReducers } from "redux";
import { authReducer, chatbotReducer } from "../redux/reducers";

export const rootReducer = combineReducers({
  auth: authReducer,
  chatbot: chatbotReducer
});