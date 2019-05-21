const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

const queryName = process.argv.slice(2)[0];

client.connect((err) => {

  if (err) {
    return console.error('Connection Error', err);
  }
  

  function getPeople(name, cb) {
      client.query('SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1', [name], (err, res) => {
        if (err) {
            return console.error('error running query', err);
        }
        cb(err, name, res.rows)
        client.end();
        });
    }

  getPeople(queryName, (err, name, people) => {
    if (err) {
        console.log('Error:', err)
    } else {
        console.log(`Found ${people.length} person(s) by the name '${name}':`)
        people.forEach((person, index) => {
            const birthdate = new Date(person.birthdate).toISOString().split('T')[0];
            console.log(`- ${index + 1}: ${person.first_name} ${person.last_name}, born '${birthdate}'`)
        })
    }
})

});

