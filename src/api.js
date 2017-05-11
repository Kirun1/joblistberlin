import env from './env.json';
import firebase, { database } from 'firebase';

var config = {
  "apiKey": env.apiKey,
  "databaseURL": env.databaseURL,
  "authDomain": env.authDomain,
  "storageBucket": env.storageBucket
};

const fb = firebase.initializeApp(config);

export function getAuth() {
	console.log('getAuth');
	fb.auth().signInAnonymously().catch(function(error) {
		console.log(error);
	});
}

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
