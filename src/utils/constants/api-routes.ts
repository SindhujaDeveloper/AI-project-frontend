const enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export const API = {
  /* Auth */
  login: { apiPath: "http://localhost:300/auth/login", action: HttpMethods.POST },
  signup: { apiPath: "http://localhost:3000/auth/signUp", action: HttpMethods.POST },
  forgetPassword: { apiPath: "http://localhost:4000/auth/forget-password", action: HttpMethods.POST },
  resetPassword: { apiPath: "http://localhost:4000/auth/reset-password", action: HttpMethods.POST },
  conversationChatbot: { apiPath: "http://localhost:3000/public/chatbot/conversation", action: HttpMethods.POST }
};