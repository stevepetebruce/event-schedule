import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
	if (props.href) {
		return (
			<a
				className={`px-6 py-3 rounded-full no-underline mr-4 inline-block button button--${
					props.size || "default"
				} ${
					props.default &&
					"bg-indigo-600 hover:bg-indigo-500 text-white button focus:outline-none focus:bg-indigo-600"
				} ${
					props.inverse &&
					"bg-transparent hover:bg-indigo-500 text-indigo-500 border border-indigo-500 hover:border-transparent hover:text-white focus:outline-none focus:bg-indigo-600 button"
				} ${
					props.danger &&
					"bg-red-700 hover:bg-red-600 text-white button focus:bg-red-700 focus:outline-none focus:bg-red-700"
				}`}
				href={props.href}>
				{props.children}
			</a>
		);
	}
	if (props.to) {
		return (
			<Link
				to={props.to}
				exact={props.exact}
				className={`px-6 py-3 rounded-full no-underline mr-4 inline-block button button--${
					props.size || "default"
				} ${
					props.default &&
					"bg-indigo-600 hover:bg-indigo-500 text-white focus:outline-none focus:bg-indigo-600 button"
				} ${
					props.inverse &&
					"bg-transparent hover:bg-indigo-500 text-indigo-500 border border-indigo-500 hover:border-transparent hover:text-white focus:outline-none focus:bg-indigo-600 button"
				} ${
					props.danger &&
					"bg-red-700 hover:bg-red-600 text-white button focus:bg-red-700 focus:outline-none focus:bg-red-700"
				}`}>
				{props.children}
			</Link>
		);
	}
	return (
		<button
			className={`px-6 py-3 rounded-full no-underline mr-4 inline-block button button--${
				props.size || "default"
			} ${
				props.default &&
				"bg-indigo-600 hover:bg-indigo-500 text-white focus:outline-none focus:bg-indigo-600 button"
			} ${
				props.inverse &&
				"bg-transparent hover:bg-indigo-500 text-indigo-500 border border-indigo-500 hover:border-transparent hover:text-white focus:outline-none focus:bg-indigo-600 button"
			} ${
				props.danger &&
				"bg-red-700 hover:bg-red-600 text-white button focus:bg-red-700 focus:outline-none focus:bg-red-700"
			}`}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.children}
		</button>
	);
};

export default Button;
