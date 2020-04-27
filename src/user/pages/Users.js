import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
	const USERS = [
		{
			id: "u1",
			name: "Fred Jones",
			image:
				"https://images.squarespace-cdn.com/content/v1/5bbf5e985239583a3ffdf9ef/1566231417267-X5VOKNAAS65ADF6AY4FW/ke17ZwdGBToddI8pDm48kIBEaGnRn0GnVDYz0K8FfhNZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIUSz3zJsQOJN6iXceCez9VYaUalUgiOas2dKR3Xzdhf0KMshLAGzx4R3EDFOm1kBS/Sem%25252Bnome%25252B4.jpg?format=100w",
			scheduleCount: 3
		},
		{
			id: "u2",
			name: "Fred Jane Smith",
			image:
				"https://images.squarespace-cdn.com/content/v1/5bbf5e985239583a3ffdf9ef/1566231417267-X5VOKNAAS65ADF6AY4FW/ke17ZwdGBToddI8pDm48kIBEaGnRn0GnVDYz0K8FfhNZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIUSz3zJsQOJN6iXceCez9VYaUalUgiOas2dKR3Xzdhf0KMshLAGzx4R3EDFOm1kBS/Sem%25252Bnome%25252B4.jpg?format=100w",
			scheduleCount: 34
		}
	];
	return <UsersList items={USERS} />;
};

export default Users;
