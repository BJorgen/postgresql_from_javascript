
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('milestones', function (table) {
        table.increments('id').primary()
        table.string('description', 255).notNullable();
        table.date('date_achieved')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
      .dropTable("milestones")
};
