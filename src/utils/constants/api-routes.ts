const enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export const API = {
  /* Auth */
  login: { apiPath: "https://chatbot-with-login.netlify.app/public/auth/login", action: HttpMethods.POST },
  signup: { apiPath: "https://chatbot-with-login.netlify.app/public/auth/signup", action: HttpMethods.POST },
  forgetPassword: { apiPath: "https://chatbot-with-login.netlify.app/public/auth/forgot-password", action: HttpMethods.POST },
  resetPassword: { apiPath: "https://chatbot-with-login.netlify.app/public/auth/reset-password", action: HttpMethods.POST },
  conversationChatbot: { apiPath: "https://chatbot-with-login.netlify.app/private/chatbot/conversation", action: HttpMethods.POST },
  textToImageChatbot: { apiPath: "https://chatbot-with-login.netlify.app/private/chatbot/textToImage", action: HttpMethods.POST }
};