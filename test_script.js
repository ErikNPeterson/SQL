const pg = require("pg");
const settings = require("./settings"); // settings.json

var argArr = process.argv.slice(2);
var arg = argArr[0]

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});



client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT *, TO_CHAR(birthdate, 'mm-dd-yyyy') AS date FROM famous_people WHERE first_name LIKE $1:: TEXT", [arg], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...")
    console.log(`Found ${result.rows.length} person(s) by the name ${arg}:`)
    result.rows.forEach((row, index) => {
      console.log(`- ${index + 1}: ${row.first_name}  ${row.last_name}, born ${row.date} `)
    });
    console.log('Search complete')
    client.end();
  });
});