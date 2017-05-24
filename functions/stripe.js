var stripe = require("stripe")(
  "sk_test_ywsJwVbwSucUsPRVZhj0BcnU"
);

stripe.charges.retrieve("ch_1AMGBnB4pS6NgUvFmLDESn1w", {
  api_key: "sk_test_ywsJwVbwSucUsPRVZhj0BcnU"
});
