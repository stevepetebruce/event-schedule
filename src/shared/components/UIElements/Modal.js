import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
	const Content = (
		<div
			className={`modal fixed bg-gray-800 z-50 ${props.modal}`}
			style={props.style}>
			<header className={`w-full py-4 px-5 bg-gray-900 props.headerClass`}>
				<h3>{props.header}</h3>
			</header>
			<form
				onSubmit={
					props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
				} className="h-full">
				<div className={`px-5 py-1 md:py-5 h-full ${props.contentClass}`}>
					{props.children}
				</div>
				<footer className={`px-5 py-5 ${props.footerClass}`}>
					{props.footer}
				</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(Content, document.querySelector("#modal-hook"));
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={400}
				classNames='modal'>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
