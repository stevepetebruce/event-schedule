import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import useForm from "../../shared/hooks/form-hook";

import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./ScheduleForm.css";

const DUMMY_SCHEDULES = [
	{
		id: "s1",
		title: "New Show",
		description: "A great show",
		imageUrl:
			"http://www.tutorialsscripts.com/free-icons/alphabet-characters/lower-case-letter/a-icon/white-little-letter-character-a-icon-48-x-48.png",
		address: "jbfds bfsdbfm  fd fmds ",
		location: {
			lat: 50.8047148,
			lng: -1.1667698,
		},
		date: "23423423",
		creator: "u1",
	},
	{
		id: "s2",
		title: "Second Show",
		description: "Another great show",
		imageUrl:
			"http://www.tutorialsscripts.com/free-icons/alphabet-characters/lower-case-letter/a-icon/white-little-letter-character-a-icon-48-x-48.png",
		address: "jbfdsbfs dbfm  fd fmds ",
		location: {
			lattitude: 51.8047148,
			longitude: -1.1667698,
		},
		date: "23423423",
		creator: "u2",
	},
];

const UpdatePlace = () => {
	const [isLoading, setIsLoading] = useState(true);
	const placeId = useParams().scheduleId;

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const mySchedule = DUMMY_SCHEDULES.find((s) => s.id === placeId);

	useEffect(() => {
		if (mySchedule) {
			setFormData(
				{
					title: {
						value: mySchedule.title,
						isValid: true,
					},
					description: {
						value: mySchedule.description,
						isValid: true,
					},
				},
				true
			);
		}
		setIsLoading(false);
	}, [setFormData, mySchedule, isLoading]);

	const scheduleUpdateSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
	};

	if (!mySchedule) {
		return (
			<div className='center'>
				<Card>
					<h2>Schedule could not be found</h2>
				</Card>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div className='center'>
				<h2>Loading...</h2>
			</div>
		);
	}
	return (
		<form className='place-form'>
			<Input
				type='text'
				id='title'
				element='input'
				label='Title'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Please enter a valid title'
				onInput={inputHandler}
				initialValue={formState.inputs.title.value}
				initialIsValid={formState.inputs.title.isValid}
			/>
			<Input
				type='description'
				id='description'
				element='textarea'
				label='Description'
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText='Please enter a valid description (min 5 characters)'
				onInput={inputHandler}
				initialValue={formState.inputs.description.value}
				initialIsValid={formState.inputs.description.isValid}
			/>
			<Button
				type='submit'
				disabled={!formState.isValid}
				onClick={scheduleUpdateSubmitHandler}>
				Update Schedule
			</Button>
		</form>
	);
};

export default UpdatePlace;
