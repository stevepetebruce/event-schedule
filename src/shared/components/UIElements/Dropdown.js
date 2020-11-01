/* eslint-disable */
import React, { useState, useEffect } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import Button from "../FormElements/Button";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

function Dropdown(props) {
	const [dropdown, setDropdown] = useState(false);

	const handleOnClick = () => setDropdown(!dropdown);
	const ref = useOnclickOutside(() => {
		setDropdown(false);
	});

	return (
		<>
			{props.columns.length > 1 ? (
				<div className='relative inline-block' ref={ref}>
					<Button default onClick={handleOnClick} style={`pr-4`}>
						{props.children} {dropdown ? <ExpandLess /> : <ExpandMore />}
					</Button>
					{dropdown && (
						<div className='absolute right-0 mt-2 py-2 bg-gray-300 rounded-lg shadow-xl'>
							<div className="sm:flex">
							{props.columns.map((column, i) => (
								<div key={i} className='w-40 inline-block'>
									<p className='font-bold mt-2'>{column ? column : props.valueName} {i + 1}</p>
									{props.rows.map((row, index) => (
										<Button inverse href={`/display/${props.id}/${i + 1}?stage=${row.stage}`}
											key={index} style="block" size="small">
											{row.stage}
										</Button>
									))}
								</div>
							))}
							</div>
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
