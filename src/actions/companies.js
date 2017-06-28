import firebase from 'firebase';
import { serverTime } from '../actions/auth';

export function postCompany(title, url) {
	const newModelRef = firebase.database().ref('links').push();

	return newModelRef.set({
		url,
		title,
		createdAt: serverTime
	})
}
