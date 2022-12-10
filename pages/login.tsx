import { NextPage } from 'next';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../lib/firebase';
import React from 'react';
import axios from 'axios';

const Login: NextPage = () => {
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const { user, password } = e.target.elements;
		try {
			const { data } = await axios.post('/api/auth', {
				email: user.value,
				password: password.value,
			});
			console.log(data);
			const auth = getAuth(app);
			onAuthStateChanged(auth, (user) => {
				if (user) {
					console.log(user);
				} else {
					console.log('no user');
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="container">
			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
				<input type="email" name="user" id="user" />
				<input type="password" name="password" id="password" />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
