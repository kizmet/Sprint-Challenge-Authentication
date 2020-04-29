"use strict";
const { transaction } = require("objection");
const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const authenticate = require("../auth/authenticate-middleware.js");

module.exports = router => {
	router.get("/users", authenticate, (req, res) => {
		const getusers = async () => {
			const users = await transaction(User.knex(), trx => {
				return User.query(trx);
			});
			res.send(users);
		};
		return getusers();
	});
};

function createStatusCodeError(statusCode) {
	return Object.assign(new Error(), {
		statusCode
	});
}
