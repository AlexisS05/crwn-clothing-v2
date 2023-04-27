import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonContainer } from './sign-in-styles.jsx';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			resetFormFields();
			// setCurrentUser(user);
		} catch (err) {
			switch (err.code) {
				case 'auth/wrong-password':
					alert('Incorrect password for email');
					break;
				case 'auth/user-not-found':
					alert('No user associated with this email');
					break;
				default:
					console.error(err);
			}
		}
	};

	const logGoogleUser = async () => {
		await signInWithGooglePopup();
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<ButtonContainer>
					<Button type='submit'>Sign In</Button>
					<Button
						buttonType={BUTTON_TYPE_CLASSES.google}
						type='button'
						onClick={logGoogleUser}
					>
						Google Sign In
					</Button>
				</ButtonContainer>
			</form>
		</SignInContainer>
	);
};
export default SignInForm;
