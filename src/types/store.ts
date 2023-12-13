import type { IAuthReducer, IchatbotReducer } from ".";
export interface IStore {
  auth: IAuthReducer,
  chatbot: IchatbotReducer
}
