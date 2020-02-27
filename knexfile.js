// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    useNullAsDefault: true,
    migrations: {directory: './database/migrations'},
    seeds: {directory: './database/seeds'},
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true,
    pool:
    {
      afterCreate: (conn, done) =>
      {
        conn.run('PRAGMA foreign_keys = ON', done)
      },
    },
    migrations: {directory: './database/migrations'},
    seeds: {directory: './database/seeds'},
  },

  staging: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {},
    migrations: {directory: './database/migrations'},
    seeds: {directory: './database/seeds'},
  },

  production: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_COBALT_URL || process.env.DATABASE_URL,
    pool: {
    },
    migrations: {directory: './database/migrations'},
    seeds: {directory: './database/seeds'},
  }

};
