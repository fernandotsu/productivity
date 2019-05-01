
exports.up = function (knex, Promise) {
    return knex.schema.createTable('task', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('projectId').references('id')
            .inTable('project').notNull()
        table.integer('stepId').references('id')
            .inTable('step').notNull()
        table.integer('createdBy').references('id')
            .inTable('users').notNull()
        table.integer('allocated1').references('id')
            .inTable('users')
        table.integer('allocated2').references('id')
            .inTable('users')
        table.integer('allocated3').references('id')
            .inTable('users')
        table.dateTime('createdAt').notNull().defaultTo(knex.fn.now())
        table.dateTime('startAt').nullable()
        table.dateTime('endAt').nullable()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('task')
};
