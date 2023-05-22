import { UserData } from '../../utils/firebase/firebase.utils';
import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
} from './user.action';
import { AnyAction } from 'redux';

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (
	state = INITIAL_STATE,
	action: AnyAction
): UserState => {
	if (signInSuccess.match(action)) {
		return { ...state, currentUser: action.payload };
	}

	if (signOutSuccess.match(action)) {
		return {
			...state,
			currentUser: null,
		};
	}

	if ((signOutFailed || signUpFailed || signInFailed).match(action)) {
		return { ...state, error: action.payload };
	}

	return state;
};
