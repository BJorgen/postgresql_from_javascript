// Implement an add_person.js script that takes in the first name, 
// last name and date of a famous person as three command line 
// arguments and uses Knex to perform an insert.

const settings = require('./settings');

const knex = require('knex')({
    client: 'pg',
    connection: settings
});

const args = process.argv.slice(2);
const firstName = args[0];
const lastName = args[1];
const dOB = args[2];


knex('famous_people').insert([{first_name: firstName, last_name: lastName, birthdate: dOB}]).asCallback(()=> {
    knex.select('*').from('famous_people').asCallback((err, res) => {
        console.log(res)
    })  
})
