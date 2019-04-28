
exports.up = function (knex, Promise) {
    return knex.schema.createTable('stepactived', t => {
        t.increments('id').primary()
        t.integer('projectId').references('id')
            .inTable('project').notNull()
        t.integer('stepId').references('id')
            .inTable('step').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('stepactived')
};
