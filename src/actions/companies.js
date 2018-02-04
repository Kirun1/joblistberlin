import firebase, { database } from 'firebase';

export function postCompany(title, url, body) {
	const newModelRef = firebase.database().ref('links').push();

	return newModelRef.set({
		url,
		title,
		body,
		isApproved: false,
		createdAt: database.ServerValue.TIMESTAMP
	})
}
