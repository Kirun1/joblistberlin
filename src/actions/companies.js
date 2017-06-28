import firebase, { database } from 'firebase';

export function postCompany(title, url) {
	const newModelRef = firebase.database().ref('links').push();

	return newModelRef.set({
		url,
		title,
		isApproved: false,
		createdAt: database.ServerValue.TIMESTAMP
	})
}
