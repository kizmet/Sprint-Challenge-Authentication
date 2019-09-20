module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./database/auth.db3" },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      }
    },
    debug: true,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./database/seeds" }
  },
  testing: {
    client: "sqlite3",
    connection: { filename: "./database/test_auth.db3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./database/seeds" }
  }
};
