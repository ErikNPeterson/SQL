const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

const [first_name, last_name, date] = process.argv.slice(2);

knex('famous_people')
  .insert({
    first_name: first_name,
    last_name: last_name,
    birthdate: date
  }).then(() => knex.destroy());