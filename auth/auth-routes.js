"use strict";
const { transaction } = require("objection");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const bcrypt = require("bcrypt");
const User = require("../database/models/User");

module.exports = router => {
	router.get("/", (req, res) => {
		res.json({ message: "API is up and running!" });
	});
	router.post("/register", async (req, res) => {
		const graph = req.body;
		const hash = await bcrypt.hash(graph.password, 10);
		const hasheduser = { username: graph.username, password: hash };
		let insertedUser;
		const user = await User.query().findOne({ username: graph.username });
		if (user) {
			res.status(404).send("username exists");
		}
		try {
			insertedUser = await transaction(User.knex(), trx => {
				return User.query(trx).insertGraph(hasheduser);
			});
			res.send({ username: insertedUser.username, id: insertedUser.id });
		} catch (err) {
			console.log(err instanceof objection.ValidationError);
			console.log(err.data);
		}
	});

	router.post("/login", async (req, res) => {
		const graph = req.body;
		let user;
		let passwordCheck;
		try {
			user = await User.query().findOne({ username: graph.username });
			if (user) {
				passwordCheck = await bcrypt.compare(
					graph.password,
					user.password
				);
				if (passwordCheck) {
					const token = await generateToken(user);
					res.status(200).json({
						message: `Welcome ${user.username}!`,
						token
					});
				} else {
					res.status(401).json({ message: "Invalid password" });
				}
			} else {
				res.status(401).send("invalid username");
			}
		} catch (err) {
			console.log(err instanceof objection.ValidationError);
			console.log(err.data);
		}
	});
};

function createStatusCodeError(statusCode) {
	return Object.assign(new Error(), {
		statusCode
	});
}

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username
	};

	const options = {
		expiresIn: "8h"
	};

	return jwt.sign(payload, secrets.jwtSecret, options);
}
