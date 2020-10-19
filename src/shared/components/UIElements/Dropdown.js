/* eslint-disable */
import React, { useState, useEffect } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import Button from "../FormElements/Button";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

function Dropdown(props) {
	const [dropdown, setDropdown] = useState(false);
	const [values, setValues] = useState([]);

	useEffect(() => {
		setValues(props.values);
	}, []);

	const handleOnClick = () => setDropdown(!dropdown);
	const ref = useOnclickOutside(() => {
		setDropdown(false);
	});

	return (
		<>
			{values.length > 1 ? (
				<div className='relative inline-block' ref={ref}>
					<Button default onClick={handleOnClick} style={`pr-4`}>
						{props.children} {dropdown ? <ExpandLess /> : <ExpandMore />}
					</Button>
					{dropdown && (
						<div className='absolute right-0 mt-2 py-2 w-48 bg-gray-300 rounded-lg shadow-xl'>
							{values.map((value, i) => (
								<a
									href={`display/${props.id}/${i + 1}`}
									key={i}
									className='block px-4 py-3 rounded-full no-underline text-gray-800 hover:bg-indigo-500 hover:text-white'>
									{value ? value : props.valueName} {i + 1}
								</a>
							))}
						</div>
					)}
				</div>
			) : (
				<Button default onClick={handleOnClick} to={`/display/${props.id}/1`}>
					{props.children}
				</Button>
			)}
		</>
	);
}

export default Dropdown;
