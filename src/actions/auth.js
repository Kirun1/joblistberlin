import firebase, { database, auth } from 'firebase';

/*
	 Auth
*/

export function getCurrentUser() {
	return new Promise((resolve, reject) => resolve(auth().currentUser) );
}

export function isAuthenticated() {
	return auth().currentUser;
}

export function updateUserEmail(email) {
	return auth().currentUser.updateEmail(email);
}

export function sendPasswordResetEmail(email) {
	return auth().sendPasswordResetEmail(email);
}

export function registerWithEmail(email, password) {
	return auth().createUserWithEmailAndPassword(email, password)
						 .then(sendVerificationEmail)
						 .then(logoutUser);
}

export function logoutUser() {
	return auth().signOut();
}

export function loginWithEmail(email, password) {
	return auth().signInWithEmailAndPassword(email, password).then(user => {

		// is the user email verified?
		if (!user.emailVerified) {

			return sendVerificationEmail().then(() => {
				logoutUser().then(() => {
					throw new Error('You need to verify your email, check your inbox for a confirmation link.');
				})
			})
		}

		// does user has its userSetting relation?
		getCurrentUserSettingRef().then(settings => {
			console.log('settings', settings.val() )
			if (!settings.val()) {
				return createUserSetting().then(() => {
					return user;
				})
			}

			return user;
		})
	});
}

export function sendVerificationEmail() {
	return getCurrentUser().then(user => user.sendEmailVerification())
}


/*
	 Database
 */

export function getCurrentUserSettingRef() {
	return getCurrentUser().then(user => {
		return database().ref('userSettings')
										 .orderByChild('user')
										 .equalTo(user.uid)
										 .limitToFirst(1)
										 .once('value');
	})
}

function createUserSetting() {
	return getCurrentUser().then(user => {
		var newUserRef = database().ref('userSettings').push();
		return newUserRef.set({
			user: user.uid
		})
	})
}
