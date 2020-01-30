import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
	const [person, setUser] = useState({
		email: '',
		password: '',
		type:'',
		DeptID:'',
	});
	return <UserContext.Provider value={[person, setUser]}>{props.children}</UserContext.Provider>;
};
