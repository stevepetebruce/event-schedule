import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Dropdown from "../../shared/components/UIElements/Dropdown";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Collapsible from "react-collapsible";
import CopyToClipboard from "../../shared/components/FormElements/CopyToClipboard"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import {Tv, ViewList}  from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
		color: '#374151',
		fontSize: "80px"
  },
});

const ScheduleItem = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const classes = useStyles(props);
	const auth = useContext(AuthContext);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [stages, setStages] = useState([]);

	const showDeleteHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/schedules/${props.id}`,
				"DELETE",
				null,
				{
					Authorization: "Bearer " + auth.token,
				}
			);

			props.onDelete(props.id);
		} catch (err) {
			console.log(err);
		}
	};

	const filteredUniqueStages = props.events.reduce((acc, current) => {
		const x = acc.find(item => item.stage === current.stage);
		if (!x) {
			return acc.concat([current]);
		} else {
			return acc;
		}
	}, []);

	useEffect(() => {
		setStages(filteredUniqueStages);
		// eslint-disable-next-line
	}, []);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showConfirmModal}
				cancel={cancelDeleteHandler}
				header='Delete Schedule'
				footer={
					<>
						<Button default onClick={cancelDeleteHandler}>CLOSE</Button>
						<Button danger onClick={confirmDeleteHandler}>DELETE</Button>
					</>
				}>
				<p>Do you want to proceed and delete this schedule?</p>
			</Modal>
			<li className='my-4'>
				<Card className='p-12'>
					{isLoading && <LoadingSpinner asOverlay={true} />}
					<h1 className='text-center'>{props.title}</h1>
					{auth.userId === props.creatorId && (
					<div className='text-center p-3 mb-3 ml-4'>
						<Button default to={`/schedules/${props.id}/edit`}>EDIT</Button>
						<Button danger onClick={showDeleteHandler}>DELETE</Button>
					</div>
					)}
					{props.logo && <img src={props.logo} alt={props.title} className="object-cover mb-3" />}
					{auth.userId === props.creatorId && (
						<>
							<div className="flex flex-row justify-evenly text-center mb-4">
								<div className="flex flex-col items-center rounded-lg border border-gray-800 w-56 pb-3 mx-1">
									<ViewList 
										fontSize="inherit"
										className={classes.root}  />
									<div className="pl-4">
										<Button default to={`/timetable/${props.id}`}>
											VIEW SCHEDULE
										</Button>
									</div>
								</div>
								<div className="flex flex-col items-center rounded-lg border border-gray-800 w-56 pb-3 mx-1">
									<Tv
										fontSize="inherit"
										className={classes.root} />
									<div className="pl-4">
										<Dropdown
										id={props.id}
										columns={[...Array(props.numDays)]}
										valueName='DAY'
										rows={stages}
										>
											DISPLAY
										</Dropdown>
									</div>
								</div>
							</div>
							<Collapsible trigger='Display my schedule'>
								<div className='flex flex-wrap -mx-3 mb-4'>
									<Formik>
										<>
											<CopyToClipboard 
												name={`${props.id}copylink`} 
												toCopy={process.env.REACT_APP_FRONTEND_URL + `/timetable/${props.id}`} 
												btnTitle='Copy Link' 
												label='Copy schedule link' 
												control='input'
											/>
											<CopyToClipboard 
												name={`${props.id}copycode`} 
												toCopy={`<iframe src="${process.env.REACT_APP_FRONTEND_URL}/timetable/${props.id}" title="${props.title}" style="border:0" width="100%" height="500px"></iframe>`} 
												btnTitle='Copy Code' 
												label='Add code to my website' 
												control='textarea'
											/>
										</>
									</Formik>
								</div>
							</Collapsible>
						</>
					)}
					
				</Card>
			</li>
		</React.Fragment>
	);
};

export default ScheduleItem;
