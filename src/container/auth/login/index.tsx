import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, FormText, Row } from "react-bootstrap";

import { loginRequest, resetState } from "../../../redux/reducers";
import { loginValidationSchema } from "../../../utils/helpers/validation";
import { regexExpressions } from "../../../utils/constants/auth";
import { PasswordResetLinkModal } from "../forgotPassword";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isPasswordResetLinkModalOpen, setIsPasswordResetLinkModalOpen] = useState(false);
	const authWindow = useRef<Window | null>();

	const openPopup = (): void => {
		const width = 600;
		const height = 600;
		const left = window.innerWidth / 2 - width / 2;
		const top = window.innerHeight / 2 - height / 2;
		const url = "https://developer.mozilla.org/en-US/docs/Web/API/Window/open";
		authWindow.current = window.open(
			url,
			"",
			`toolbar=no, location=no,directories=no, status=no, menubar=no,
       scrollbars=no, resizable=no, copyhistory=no,width=${width}, 
       height=${height}, top=${top}, left=${left}`
		);
	};

	useEffect(() => {
		dispatch(resetState());
	}, [dispatch]);

	const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
		initialValues: {
			userNameOrEmail: localStorage.getItem("userNameOrEmail") ?? "",
			password: localStorage.getItem("password") ?? "",
			isRememberMe: false
			// userNameOrEmail: "",
			// password: "",
			// isRememberMe: false
		},
		enableReinitialize: true,
		validationSchema: loginValidationSchema,
		validateOnChange: true,
		onSubmit: (values, { setSubmitting }) => {
			dispatch(loginRequest(({
				password: values.password,
				isRememberMe: values.isRememberMe,
				// companyName: "",
				...(regexExpressions.email.test(values.userNameOrEmail)
					? { email: values.userNameOrEmail }
					: { username: values.userNameOrEmail })
			}
			)));
			setSubmitting(false);
		}
	});

	return (
		<Container className="w-50">
			<h3 className="text-center">Login</h3>
			<Form onSubmit={handleSubmit}>
				<FormGroup as={Row} className="mb-3">
					<Col>
						<FormControl
							placeholder="User Name/Email Address"
							name="userNameOrEmail"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.userNameOrEmail.toLowerCase()}
							isInvalid={!!(errors.userNameOrEmail !== undefined && touched.userNameOrEmail !== undefined)}
						/>
						<FormControl.Feedback type="invalid">
							{errors.userNameOrEmail !== undefined && touched.userNameOrEmail !== undefined ? errors.userNameOrEmail : null}
						</FormControl.Feedback>
					</Col>
				</FormGroup>
				<FormGroup as={Row} className="mb-3">
					<Col>
						<FormControl
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							isInvalid={!!(errors.password !== undefined && touched.password !== undefined)}
						/>
						<FormControl.Feedback type="invalid">
							{errors.password !== undefined && touched.password !== undefined ? errors.password : null}
						</FormControl.Feedback>

					</Col>
				</FormGroup>
				<FormGroup as={Row}>
					<Col>
						<FormCheck
							label="Remember me"
							name="isRememberMe"
							className="ps-4"
							type="checkbox"
							checked={values.isRememberMe}
							onChange={handleChange}
						/>
					</Col>
					<Col className="text-end">
						<FormLabel onClick={() => { setIsPasswordResetLinkModalOpen(true); }}>
							Forgot Password?
						</FormLabel>
					</Col>
				</FormGroup>
				<FormGroup as={Row} className="pt-3">
					<Col>
						<Button
							type="submit"
							className="w-100"
							disabled={
								isSubmitting ||
								Object.values(values).filter((it) => it === "").length !== 0 ||
								Object.values(errors).filter((it) => it !== "").length !== 0
							}
						>
							Login
						</Button>
					</Col>
				</FormGroup >
				<div className="text-center pt-2">
					<FormText>{"Don't have an account?"}<FormText className="text-decoration-underline" onClick={() => { navigate("/signup"); }}>Sign-up</FormText></FormText>
				</div>
			</Form>
			<PasswordResetLinkModal
				show={isPasswordResetLinkModalOpen}
				handleClose={() => {
					setIsPasswordResetLinkModalOpen(false);
					dispatch(resetState());
				}}
			/>
			<Button className="mt-3 w-100" variant="outline-primary" onClick={openPopup}>Sign in with google</Button>
		</Container >
	);
};

export default Login;