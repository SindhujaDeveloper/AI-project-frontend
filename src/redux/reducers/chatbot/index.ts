import { IActionWithPayload,ISignUpPayload, IchatbotReducer } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IchatbotReducer = {
  isFetching: false,
  error:"",
  data: [],
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    conversationChatbotRequest: (state: IchatbotReducer, _action: IActionWithPayload<ISignUpPayload>) => {
      state.isFetching = true;
      state.error = "";
    },
    conversationChatbotResponse: (state: IchatbotReducer, action: IActionWithPayload<any>) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = "";
    },
    conversationChatbotFailure: (state: IchatbotReducer, action: IActionWithPayload<string>) => {
      state.isFetching = false;
      state.data = initialState.data;
      state.error = action.payload;
    }
  },
});

export const {
  conversationChatbotRequest,
  conversationChatbotResponse,
  conversationChatbotFailure,
} = chatbotSlice.actions;

export const chatbotReducer = chatbotSlice.reducer;
