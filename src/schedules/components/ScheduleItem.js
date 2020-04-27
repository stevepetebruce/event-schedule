import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";

import "./ScheduleItem.css";

const ScheduleItem = (props) => {
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

	const confirmDeleteHandler = () => {
		console.log("Deleting...");
		setShowConfirmModal(false);
	};

	return (
		<React.Fragment>
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
					<div className='place-item__image'>
						<img src={props.image} alt={props.title} />
					</div>
					<div className='place-item__info'>
						<h1>{props.title}</h1>
						<h2>{props.location}</h2>
						<p>{props.description}</p>
					</div>
					{auth.isLoggedIn && (
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
