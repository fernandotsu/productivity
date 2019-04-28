
exports.up = function (knex, Promise) {
    return knex.schema.createTable('project', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.boolean('completed').notNull().defaultTo(false)
        table.boolean('canceled').notNull().defaultTo(false)
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('project')
};
