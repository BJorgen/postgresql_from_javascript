const pg = require('pg');
const moment = require('moment');
const settings = require('./settings');
const client = new pg.Client(settings);
const queryName = process.argv.slice(2)[0];

//======= Helper / Callback Function to Print People =============
function printPeople(err, name, people){
    if (err) {
        throw err;
    } else {
        console.log(`Found ${people.length} person(s) by the name '${name}':`)
        people.forEach((person, index) => {
            const birthdate = moment(person.birthdate).format('YYYY-MM-DD');
            console.log(
                `- ${index + 1}: ${person.first_name} ${person.last_name}, born '${birthdate}'`
            )
        });
    }
}

//======= Connecting to the Database ==============
client.connect((err) => {
  if (err) {
    throw err;
  }
  
  function getPeople(name, cb) {
      client.query(`SELECT * FROM famous_people 
                    WHERE first_name = $1 OR last_name = $1`, 
                    [name], (err, res) => {
        if (err) {
            throw err;
        }
            cb(null, name, res.rows)
            client.end();
        });
    }

    getPeople(queryName, printPeople);
});

