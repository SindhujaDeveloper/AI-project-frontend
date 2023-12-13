const enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export const API = {
  /* Auth */
  login: { apiPath: "http://localhost:3000/public/auth/login", action: HttpMethods.POST },
  signup: { apiPath: "http://localhost:3000/public/auth/signup", action: HttpMethods.POST },
  forgetPassword: { apiPath: "http://localhost:3000/public/auth/forgot-password", action: HttpMethods.POST },
  resetPassword: { apiPath: "http://localhost:3000/public/auth/reset-password", action: HttpMethods.POST },
  conversationChatbot: { apiPath: "http://localhost:3000/private/chatbot/conversation", action: HttpMethods.POST },
  textToImageChatbot: { apiPath: "http://localhost:3000/private/chatbot/textToImage", action: HttpMethods.POST }
};