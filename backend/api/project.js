module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const save = async (req, res) => {
        const project = { ...req.body };

        if (req.params.id) project.id = req.params.id;

        try {
            existsOrError(project.name, 'Projeto não informado');

            const projectFromDB = await app.db('project')
                .where({ name: project.name }).first()
            if (!project.id) {
                notExistsOrError(projectFromDB, 'Projeto já cadastrado');
            }

        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (project.id) {
            app.db('project')
                .update(project)
                .where({ id: project.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        } else {
            app.db('project')
                .insert(project)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    };

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('project')
                .where({ id: req.params.id }).del();

            try {
                existsOrError(rowsDeleted, 'Projeto naõ foi encontrado');
            } catch (msg) {
                return res.status(400).send(msg);
            }

            res.status(204).send();
        } catch (msg) {
            res.status(500).send(msg);
        }
    };

    const limit = 20;
    const get = async (req, res) => {
        const page = req.query.page || 1;

        const result = await app.db('project').count('id').first()
        const count = parseInt(result.count);

        app.db('project')
            .select('id', 'name', 'completed', 'canceled')
            .limit(limit).offset(page * limit - limit)
            .then(project => res.json({ data: project, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('project')
            .where({ id: req.params.id })
            .first()
            .then(proj => res.json(proj))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById };
}