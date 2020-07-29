import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./ScheduleItem.css";

const ScheduleItem = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);
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

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showMap}
				oncancel={closeMapHandler}
				header={props.address}
				contentClass='place-item__modal-content'
				footerClass='place-item__modal-actions'
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
				<div className='map-container'>
					<Map center={props.coordinates} zoom={16} />
				</div>
			</Modal>
			<Modal
				show={showConfirmModal}
				cancel={cancelDeleteHandler}
				header='Delete Schedule'
				contentClass='modal__content'
				footerClass='place-item__modal-actions'
				footer={
					<>
						<Button inverse onClick={cancelDeleteHandler}>
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
						<h2>{props.location}</h2>
						<p>{props.description}</p>
					</div>
					{auth.userId === props.creatorId && (
						<div className='place-item__actions'>
							<Button inverse onClick={openMapHandler}>
								VIEW MAP
							</Button>
							<Button to={`/schedules/${props.id}/edit`}>EDIT</Button>
							<Button to={`/schedules/${props.id}`}>VIEW SCHEDULE</Button>
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
