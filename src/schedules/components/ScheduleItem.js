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

import TvIcon from '@material-ui/icons/Tv';
import ViewListIcon from '@material-ui/icons/ViewList';

import "./ScheduleItem.css";

const ScheduleItem = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
				`http://localhost:5000/api/schedules/${props.id}`,
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
				contentClass='modal__content'
				footerClass='place-item__modal-actions'
				footer={
					<>
						<Button default onClick={cancelDeleteHandler}>
							CLOSE
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</>
				}>
				<p>Do you want to proceed and delete this schedule?</p>
			</Modal>
			<li className='place-item'>
				<Card className='palace-item__content'>
					{isLoading && <LoadingSpinner asOverlay={true} />}
					{props.logo && (
						<div className='place-item__image'>
							<img src={props.logo} alt={props.title} />
						</div>
					)}
					<div className='place-item__info'>
						<h1>{props.title}</h1>
					</div>
					{auth.userId === props.creatorId && (
						<>
						<div className='text-center p-3 mb-3'>
							<Button default to={`/schedules/${props.id}/edit`}>EDIT</Button>
							<Button danger onClick={showDeleteHandler}>DELETE</Button>
						</div>
						<div className="flex flex-row justify-evenly text-center mb-4">
							<div className="flex flex-col items-center rounded-lg border border-gray-800 w-56 pb-3 mx-1">
								<ViewListIcon 
									fontSize="inherit"
    							style={{ fontSize: "80px" }}
									className="rotate-90" />
								<div className="pl-4">
									<Button default to={`/timetable/${props.id}`}>
										VIEW SCHEDULE
									</Button>
								</div>
							</div>
							<div className="flex flex-col items-center rounded-lg border border-gray-800 w-56 pb-3 mx-1">
								<TvIcon
									fontSize="inherit"
    							style={{ fontSize: "80px" }} />
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
											toCopy={`http://localhost:3000/timetable/${props.id}`} 
											btnTitle='Copy Link' 
											label='Copy schedule link' 
											control='input'
										/>
										<CopyToClipboard 
											name={`${props.id}copycode`} 
											toCopy={`<iframe src="http://localhost:3000/timetable/${props.id}" title="${props.title}" style="border:0" width="100%" height="500px"></iframe>`} 
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
