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
    });
};

//npx knex seed:run --env=testing
