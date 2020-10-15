import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";

const ErrorModal = (props) => {
	return (
		<Modal
			onCancel={props.onClear}
			header='An Error Occurred!'
			show={!!props.error}
			footer={
				<Button default onClick={props.onClear}>
					Close
				</Button>
			}>
			<p>{props.error}</p>
		</Modal>
	);
};

export default ErrorModal;
