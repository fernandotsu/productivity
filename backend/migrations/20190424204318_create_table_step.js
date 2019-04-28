
exports.up = function (knex, Promise) {
    return knex.schema.createTable('step', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('ordem')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('step')
};
