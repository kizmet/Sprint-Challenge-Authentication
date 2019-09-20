const bcrypt = require("bcrypt");

// const users = [
//   { username: "bryant", password: "password" },
//   { username: "bobby", password: "password" },
//   { username: "jane", password: "password" },
//   { username: "meryl", password: "password" }
// ];
//
// const hashedUsers = users.map(user => {
//   const hashed = async () => await bcrypt.hash(user.password, 10)
//   return {
//     user.password: hashed,
//     ...user
//   };
// });
// const hashedUsers = users.reduce(user =>
//   user.map(user => ({ username: user.username, password: hash(user.password) }))
// );

exports.seed = function(knex, Promise) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        { username: "bryant", password: "password" },
        { username: "bobby", password: "password" },
        { username: "jane", password: "password" },
        { username: "meryl", password: "password" }
      ]);
      return knex("users").insert(hashedUsers);
    });
};

//npx knex seed:run --env=testing
