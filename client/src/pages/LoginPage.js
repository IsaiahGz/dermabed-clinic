import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER, LOGIN } from '../utils/mutations';

const LoginPage = () => {
	const [formState, setFormState] = useState({ email: '', password: '' });
	const [addUser] = useMutation(ADD_USER);
	const [login] = useMutation(LOGIN);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleLoginSubmit = async (event) => {
		event.preventDefault();
		try {
			const mutationResponse = await login({
				variables: {
					email: formState.email,
					password: formState.password,
				},
			});
			const token = mutationResponse.data?.login?.token;
			if (token) {
				Auth.login(token);
			} else {
				console.log('Err logging in', mutationResponse.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleSignupSubmit = async (event) => {
		event.preventDefault();
		try {
			const mutationResponse = await addUser({
				variables: {
					email: formState.signupEmail,
					password: formState.signupPassword,
					firstName: formState.firstName,
					lastName: formState.lastName,
				},
			});
			const token = mutationResponse.data?.addUser?.token;
			if (token) {
				Auth.login(token);
			} else {
				console.log('Err logging in', mutationResponse.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className='container mx-auto p-4'>
			<div className='flex flex-wrap justify-center items-center'>
				<div className='w-full md:w-1/2 p-4'>
					<div className='bg-white p-4 rounded-lg shadow-md'>
						<h2 className='text-2xl font-bold mb-8'>Login</h2>
						<form onSubmit={handleLoginSubmit}>
							<label htmlFor='login-email' className='block text-sm mb-2'>
								Email:
							</label>
							<input
								type='email'
								name='loginEmail'
								id='login-email'
								className='w-full mb-4 p-2 border rounded'
								onChange={handleChange}
								required
							/>

							<label htmlFor='login-password' className='block text-sm mb-2'>
								Password:
							</label>
							<input
								type='password'
								name='loginPassword'
								id='login-password'
								className='w-full mb-4 p-2 border rounded'
								onChange={handleChange}
								required
							/>

							<button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
								Login
							</button>
						</form>
					</div>
				</div>
				<div className='w-full md:w-1/2 p-4'>
					<div className='bg-white p-4 rounded-lg shadow-md'>
						<h2 className='text-2xl font-bold mb-8'>Sign Up</h2>
						<form onSubmit={handleSignupSubmit}>
							<label htmlFor='signup-firstname' className='block text-sm mb-2'>
								First Name:
							</label>
							<input
								type='text'
								name='firstName'
								id='signup-firstname'
								className='w-full mb-4 p-2 border rounded'
								onChange={handleChange}
								required
							/>

							<label htmlFor='signup-lastname' className='block text-sm mb-2'>
								Last Name:
							</label>
							<input
								type='text'
								name='lastName'
								id='signup-lastname'
								className='w-full mb-4 p-2 border rounded'
								onChange={handleChange}
								required
							/>

							<label htmlFor='signup-email' className='block text-sm mb-2'>
								Email:
							</label>
							<input
								type='email'
								name='signupEmail'
								id='signup-email'
								className='w-full mb-4 p-2 border rounded'
								onChange={handleChange}
								required
							/>

							<label htmlFor='signup-password' className='block text-sm mb-2'>
								Password:
							</label>
							<input
								type='password'
								name='signupPassword'
								id='signup-password'
								className='w-full mb-4 p-2 border rounded'
								onChange={handleChange}
								required
							/>

							<button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
