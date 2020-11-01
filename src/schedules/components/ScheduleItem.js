import React, { useState, useContext, useEffect } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Dropdown from "../../shared/components/UIElements/Dropdown";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

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
					<div className='place-item__image'>
						<img src={props.image} alt={props.title} />
					</div>
					<div className='place-item__info'>
						<h1>{props.title}</h1>
						<p>{props.description}</p>
					</div>
					{auth.userId === props.creatorId && (
						<div className='place-item__actions'>
							<Button default to={`/schedules/${props.id}/edit`}>
								EDIT
							</Button>
							<Button default to={`/${props.id}`}>
								VIEW SCHEDULE
							</Button>
							<Dropdown
								id={props.id}
								columns={[...Array(props.numDays)]}
								valueName='DAY'
								rows={stages}
								>
								DISPLAY
							</Dropdown>
							<Button danger onClick={showDeleteHandler}>
								DELETE
							</Button>
						</div>
					)}
				</Card>
			</li>
		</React.Fragment>
	);
};

export default ScheduleItem;
