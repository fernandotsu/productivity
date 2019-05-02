module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/project')
        .all(app.config.passport.authenticate())
        .get(app.api.project.get)
        .post(app.api.project.save)

    app.route('/project/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.project.getById)
        .put(app.api.project.save)
        .delete(app.api.project.remove)

    app.route('/step')
        .all(app.config.passport.authenticate())
        .get(app.api.step.get)
        .post(app.api.step.save)

    app.route('/step/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.step.getById)
        .put(app.api.step.save)
        .delete(app.api.step.remove)

    app.route('/task')
        .all(app.config.passport.authenticate())
        .get(app.api.task.get)
        .post(app.api.task.save)

    app.route('/task/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.task.getById)
        .put(app.api.task.save)
        .delete(app.api.task.remove)

    app.route('/taskhistory')
        .all(app.config.passport.authenticate())
        .get(app.api.taskhistory.get)
        .post(app.api.taskhistory.save)

    app.route('/taskhistory/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.taskhistory.getById)
        .put(app.api.taskhistory.save)
        .delete(app.api.taskhistory.remove)

    app.route('/stepactived')
        .all(app.config.passport.authenticate())
        .get(app.api.stepactived.get)
        .post(app.api.stepactived.save)

    app.route('/stepactived/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.stepactived.getById)
        .put(app.api.stepactived.save)
        .delete(app.api.stepactived.remove)
};