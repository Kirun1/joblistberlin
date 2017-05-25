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

export function getUserRef(firebaseUserUid) {
	database().ref('userSettings')
						.orderByChild('user')
						.equalTo(firebaseUserUid)
						.once('value')
						.then(snapshot => {
							const user = snapshot.val();
							console.log(user)
							if (!user) {
								console.log('Created new user')
								return createUser(firebaseUserUid)
							} else {
								return user;
							}
						})
}

function createUser(userUid) {
	console.log('userUid', userUid);
	var newUserRef = database().ref('userSettings').push();
	return newUserRef.set({
		user: userUid
	})
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
			return getUserRef(user.uid);
		} else {
			sendVerificationEmail();
			return logoutUser().then(() => {
				throw new Error('You need to verify your email, check your inbox for a confirmation link.');
			});
		}
	});
}

export function sendVerificationEmail() {
	return getCurrentUser().then(user => user.sendEmailVerification());
}
