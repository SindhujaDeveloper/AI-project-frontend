import { createBrowserRouter } from "react-router-dom";
import { ResetPassword } from "../container/auth/forgotPassword";
import Login from "../container/auth/login";
import SignUp from "../container/auth/signup";
import { PrivateLayout, PublicLayout } from "../layout";
import Chatbot from "src/container/chatbot";
import Dashboard from "src/container/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{
      path: "signup",
      element: <SignUp />
    }, {
      path: "login",
      element: <Login />,
    }, {
      path: "resetPassword",
      element: <ResetPassword />
    }]

  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [{
      path: "dashboard",
      element: <Dashboard />
    }, {
      path: "chatbot",
      element: <Chatbot />
    }]
  },
]);
export default router;
