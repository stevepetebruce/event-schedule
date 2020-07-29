import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Authenticate.css";

const Authenticate = (props) => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((previousMode) => !previousMode);
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();

		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					"http://localhost:5000/api/login",
					"POST",
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
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
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
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
			} catch (err) {}
		}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay={true} />}
				<h2>{isLoginMode ? "Log In" : "Sign Up"}</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							type='text'
							id='name'
							element='input'
							label='Your Name'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a name'
							onInput={inputHandler}
						/>
					)}
					<Input
						type='text'
						id='email'
						element='input'
						label='Email Address'
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
						errorText='Please enter a valid email address'
						onInput={inputHandler}
					/>
					<Input
						type='password'
						id='password'
						element='input'
						label='Password'
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
						errorText='Please enter a password longer than 6 characters'
						onInput={inputHandler}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						{isLoginMode ? "Log In" : "Sign Up"}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					Switch to {isLoginMode ? "Sign Up" : "Log In"}
				</Button>
			</Card>
		</>
	);
};

export default Authenticate;
