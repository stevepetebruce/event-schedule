import React from "react";

function TextError(props) {
	return <p className='text-red-500 text-xs italic'>{props.children}</p>;
}

export default TextError;
