import React from "react";

import InputFormik from "./InputFormik";
import TextArea from "./TextArea";

function FormControl(props) {
	const { control, ...rest } = props;
	switch (control) {
		case "input":
			return <InputFormik {...rest} />;
		case "textarea":
			return <TextArea {...rest} />;
		case "select":
		case "checkbox":
		case "date":
		case "time":
		default:
			return null;
	}
}

export default FormControl;
