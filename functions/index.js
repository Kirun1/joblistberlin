var functions = require('firebase-functions');
var stripe = require("stripe")(
	// test key
  "sk_test_ywsJwVbwSucUsPRVZhj0BcnU"
);

// Create and Deploy Your First Cloud Functions
// https:firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from HUGO!");
	console.log('hugolito');
});

exports.newUser = functions.auth.user()
													.onCreate(event => {
														console.log('newUser');
													})

exports.newLink = functions.database
													 .ref('/links/{id}')
													 .onWrite(event => {
														 console.log('newLink');
													 });
exports.newLink = functions.database
													 .ref('/jobs/{id}')
													 .onWrite(event => {
														 console.log(event.val())
														 stripe.charges.create({
															 amount: 2000,
															 currency: "usd",
															 source: "tok_1AICCXB4pS6NgUvFQgcBzHRY", // obtained with Stripe.js
															 metadata: {'order_id': '6735'}
														 });
													 });
