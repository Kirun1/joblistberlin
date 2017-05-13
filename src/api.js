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
// real-time database
const db = firebaseApp.database();
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

export function registerWithEmail(email, password) {
	firebase.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(console.log)
					.catch(onLoginError);
}

export function loginWithEmail(email, password) {
	return firebase.auth().signInWithEmailAndPassword(email, password)
								 .then(onLogin)
								 .catch(onLoginError);
}

function onLogin(user) {
	console.log('on login user:', user)
	window.localStorage.setItem('user', JSON.stringify(user));
}

function onLoginError(e) {
	console.log('Login error', e);
}
