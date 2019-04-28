module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/project')
        .get(app.api.project.get)
        .post(app.api.project.save)

    app.route('/project/:id')
        .get(app.api.project.getById)
        .put(app.api.project.save)
        .delete(app.api.project.remove)

    app.route('/step')
        .get(app.api.step.get)
        .post(app.api.step.save)

    app.route('/step/:id')
        .get(app.api.step.getById)
        .put(app.api.step.save)
        .delete(app.api.step.remove)
};