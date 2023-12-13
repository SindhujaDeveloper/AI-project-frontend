import * as Yup from "yup";
import { regexExpressions } from "../constants/auth";

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Full Name required"),
  userName: Yup.string().trim().required("User Name required"),
  companyName: Yup.string().trim(),
  companyUrl: Yup.string().trim(),
  email: Yup.string().trim().required("Email required").matches(regexExpressions.email, "Please enter a valid Email"),
  password: Yup.string()
    .required("Password required")
    .min(5, "Password should be minimum 8 characters")
    .max(20, "Password should not be maximum 20 characters"),
  confirmPassword: Yup.string().required("Confirm Password required").oneOf(
    [Yup.ref("password")],
    "Passwords doesn't match"
  ),
});

export const loginValidationSchema = Yup.object().shape({
  userNameOrEmail: Yup.string().trim()
    .required("User Name / Email is required").test("username_or_email", "Please enter a valid username or email",
      (value) => regexExpressions.email.test(value) || regexExpressions.userName.test(value)),
  password: Yup.string().trim()
    .required("Password required")
    .min(5, "Password should be minimum 8 characters")
    .max(20, "Password should not be maximum 20 characters"),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password required")
    .min(5, "Password should be minimum 8 characters")
    .max(20, "Password should not be maximum 20 characters"),
  confirmPassword: Yup.string().required("Confirm Password required").oneOf(
    [Yup.ref("password")],
    "Passwords doesn't match"
  ),
});
