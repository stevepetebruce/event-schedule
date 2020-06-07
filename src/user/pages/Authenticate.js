import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Authenticate.css";

const Authenticate = (props) => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);

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

	const authSubmitHandler = async (e) => {
		e.preventDefault();

		if (isLoginMode) {
		} else {
			try {
				const response = await fetch("http://localhost:5000/api/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});
				const responseData = await response.json();
				console.log(responseData);
			} catch (error) {
				console.log(error);
			}
		}

		auth.login();
	};

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

	return (
		<Card className='authentication'>
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
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a password longer than 5 characters'
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
	);
};

export default Authenticate;
