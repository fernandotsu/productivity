
exports.up = function (knex, Promise) {
    return knex.schema.createTable('taskhistory', t => {
        t.increments('id').primary()
        t.string('description').notNull()
        t.integer('taskId').references('id')
            .inTable('task').notNull()
        t.integer('userId').references('id')
            .inTable('users').notNull()
        t.dateTime('createdAt').notNull().defaultTo(knex.fn.now())
        t.boolean('note').notNull().defaultTo(false)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('taskhistory')
};
