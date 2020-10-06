import React from "react";

const Card = (props) => {
	return (
		<div
			className='max-w-xl mx-auto py-10 px-10 text-gray-700 bg-gray-900 rounded-lg text-left font-medium shadow-lg'
			style={props.style}>
			{props.children}
		</div>
	);
};

export default Card;
