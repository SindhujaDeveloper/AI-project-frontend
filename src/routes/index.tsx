import { createBrowserRouter } from "react-router-dom";
import { ResetPassword } from "../container/auth/forgotPassword";
import Login from "../container/auth/login";
import SignUp from "../container/auth/signup";
import { PublicLayout } from "../layout";
import Chatbot from "src/container/chatbot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{
      path: "/",
      element: <Chatbot />
    }, {
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
  // {
  //   path: "/app",
  //   element: <PrivateLayout />,
  //   children: [{
  //     path: "dashboard",
  //     element: <Dashboard />
  //   }]
  // },
]);
export default router;
