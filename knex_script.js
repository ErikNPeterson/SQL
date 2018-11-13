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

var argArr = process.argv.slice(2);
var arg = argArr[0]

knex('famous_people')
  .where(
    'first_name',
    'like',
    `%${arg}%`
  )
  .then(rows => {
    console.log("Searching...")
    console.log(`Found ${rows.length} person(s) by the name ${arg}:`)
    rows.forEach((row, index) => {
      console.log(`- ${index + 1}: ${row.first_name}  ${row.last_name}, born ${row.birthdate} `)
    });
    console.log('Search complete')
    knex.destroy()
  })