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

    app.route('/task')
        .get(app.api.task.get)
        .post(app.api.task.save)

    app.route('/task/:id')
        .get(app.api.task.getById)
        .put(app.api.task.save)
        .delete(app.api.task.remove)

    app.route('/taskhistory')
        .get(app.api.taskhistory.get)
        .post(app.api.taskhistory.save)

    app.route('/taskhistory/:id')
        .get(app.api.taskhistory.getById)
        .put(app.api.taskhistory.save)
        .delete(app.api.taskhistory.remove)
};