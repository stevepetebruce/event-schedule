import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormControl from "../../shared/components/FormElements/FormControl";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Authenticate.css";

const Authenticate = (props) => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const initialValues = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const validationSchemaSignUp = Yup.object({
		name: Yup.string(),
		email: Yup.string()
			.email("Please enter a valid email")
			.required("Email required"),
		password: Yup.string()
			.min(6, "Please enter a minimum of 6 characters")
			.required("Password required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), ""], "Passwords must match")
			.required("Required"),
	});

	const validationSchemaLogin = Yup.object({
		email: Yup.string()
			.email("Please enter a valid email")
			.required("Email required"),
		password: Yup.string()
			.min(6, "Please enter a minimum of 6 characters")
			.required("Password required"),
	});

	const switchModeHandler = () => {
		setIsLoginMode((previousMode) => !previousMode);
	};

	const onSubmit = async (values) => {
		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					"http://localhost:5000/api/login",
					"POST",
					JSON.stringify({
						...values,
					}),
					{
						"Content-Type": "application/json",
					}
				);
				auth.login(
					responseData.userId,
					responseData.token,
					responseData.status
				);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const responseData = await sendRequest(
					"http://localhost:5000/api/signup",
					"POST",
					JSON.stringify({
						...values,
					}),
					{
						"Content-Type": "application/json",
					}
				);

				auth.login(
					responseData.userId,
					responseData.token,
					responseData.status
				);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay={true} />}
				<h2>{isLoginMode ? "Log In" : "Sign Up"}</h2>
				<hr />
				{!isLoginMode && (
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchemaSignUp}
						onSubmit={onSubmit}>
						{(formik) => {
							return (
								<>
									<Form>
										<FormControl
											control='input'
											type='text'
											label='Name'
											name='name'
										/>
										<FormControl
											control='input'
											type='text'
											label='Email address'
											name='email'
										/>
										<FormControl
											control='input'
											type='password'
											label='Password'
											name='password'
										/>
										<FormControl
											control='input'
											type='password'
											label='Confirm password'
											name='confirmPassword'
										/>
										<Button type='submit' disabled={!formik.isValid}>
											{isLoginMode ? "Log In" : "Sign Up"}
										</Button>
										<Button type='reset' inverse onClick={switchModeHandler}>
											Switch to {isLoginMode ? "Sign Up" : "Log In"}
										</Button>
									</Form>
								</>
							);
						}}
					</Formik>
				)}
				{isLoginMode && (
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchemaLogin}
						onSubmit={onSubmit}>
						{(formik) => {
							return (
								<>
									<Form>
										<FormControl
											control='input'
											type='text'
											label='Email address'
											name='email'
										/>
										<FormControl
											control='input'
											type='password'
											label='Password'
											name='password'
										/>
										<Button type='submit' disabled={!formik.isValid}>
											{isLoginMode ? "Log In" : "Sign Up"}
										</Button>
										<Button type='reset' inverse onClick={switchModeHandler}>
											Switch to {isLoginMode ? "Sign Up" : "Log In"}
										</Button>
									</Form>
								</>
							);
						}}
					</Formik>
				)}
			</Card>
			<ErrorModal error={error} onClear={clearError} />
		</>
	);
};

export default Authenticate;
