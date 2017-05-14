import env from './env.json';
import firebase, { database } from 'firebase';

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

export function getServerTime() {
	return database.ServerValue.TIMESTAMP;
}

function buildUrl(endPoint) {
  return `${env.apiRootUrl}/${endPoint}.json`;
}

export function callAPI(endPoint, options) {
  return fetch(buildUrl(endPoint), options).then(response => response.json());
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
	return auth.currentUser;
}

export function registerWithEmail(email, password) {
	return auth.createUserWithEmailAndPassword(email, password)
						 .then(sendVerificationEmail)
						 .then(logoutUser);
}

export function logoutUser() {
	return auth.signOut()
						 .then(data => console.log('logout success', data));
}

export function loginWithEmail(email, password) {
	return auth.signInWithEmailAndPassword(email, password).then(user => {
		if(user.emailVerified) {
			return user;
		} else {
			sendVerificationEmail();
			return logoutUser().then(() => {
				throw new Error('Email is not verified, check your inbox');
			});
		}
	});
}
function sendVerificationEmail() {
	getCurrentUser().sendEmailVerification().then((data) => {
		console.log('email verification sent:', data);
		logoutUser();
	}).catch(e => console.log('email verification error:', e))
}

function onLogin(user) {
	console.log('on login user:', user)
}
