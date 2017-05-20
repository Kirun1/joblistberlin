import env from './env.json';
import firebase, { database } from 'firebase';
import _ from 'lodash';

var config = {
  "apiKey": env.apiKey,
  "databaseURL": env.databaseURL,
  "authDomain": env.authDomain,
  "storageBucket": env.storageBucket
};

// root app just in case we need it
const firebaseApp = firebase.initializeApp(config);
// firebase auth namespace
export const auth = firebaseApp.auth();

/*
	 Database
*/

// A placeholder value for auto-populating the current
// timestamp(time since the Unix epoch, in milliseconds)
// as determined by the Firebase servers.
// https://firebase.google.com/docs/reference/js/firebase.database.ServerValue
// it has nothing to do with firebase.database() ...
export const serverTime = database.ServerValue.TIMESTAMP;

export function callAPI(endPoint) {
	return new Promise((resolve, reject) => {
		database().ref(endPoint).on('value', (snapshot) => {
			const res = _.values(snapshot.val());
			resolve(res);
		})
	});
}

export function postAPI(endpoint, data) {
  const options = {
		method: 'POST',
		body: JSON.stringify(data)
  }
  return callAPI(endpoint, options).then(answer => {
		console.log( 'answer', answer );
  });
}
export function postToCompanies(data) {
  postAPI('links', data);
}
export function postToJobs(data) {
  postAPI('jobs', data);
}

/*
	 Auth
*/

export function isAuthenticated() {
	return auth.currentUser;
}

export function getCurrentUser() {
	return new Promise((resolve, reject) => resolve(auth.currentUser) );
}

export function updateUserEmail(email) {
	return auth.currentUser.updateEmail(email);
}

export function sendPasswordResetEmail(email) {
	return auth.sendPasswordResetEmail(email);
}

export function registerWithEmail(email, password) {
	return auth.createUserWithEmailAndPassword(email, password)
						 .then(sendVerificationEmail)
						 .then(logoutUser);
}

export function logoutUser() {
	return auth.signOut();
}

export function loginWithEmail(email, password) {
	return auth.signInWithEmailAndPassword(email, password).then(user => {
		if(user.emailVerified) {
			return user;
		} else {
			sendVerificationEmail();
			return logoutUser().then(() => {
				throw new Error('You need to verify your <email>, check your inbox for a confirmation link.');
			});
		}
	});
}

export function sendVerificationEmail() {
	return getCurrentUser().then(user => user.sendEmailVerification());
}
