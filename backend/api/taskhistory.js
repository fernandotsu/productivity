module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const save = async (req, res) => {
        const taskhistory = { ...req.body };
        if (req.params.id) taskhistory.id = req.params.id;

        try {
            if (taskhistory.note) {
                existsOrError(taskhistory.description, 'Descrição não informada');
            }
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (taskhistory.id) {
            app.db('taskhistory')
                .update(taskhistory)
                .where({ id: taskhistory.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('taskhistory')
                .insert(taskhistory)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    };

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('taskhistory')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'Histórico ou comentário não encontrado');

            res.status(204).send();
        } catch (msg) {
            res.status(500).send(msg);
        }
    };

    const get = (req, res) => {
        app.db('taskhistory')
            .select('taskhistory.id', 'taskhistory.description', 'u.name as user')
            .leftJoin('users as u', 'taskhistory.userId', 'u.id')
            .then(s => res.json({ data: s }))
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) => {
        app.db('taskhistory')
            .select('taskhistory.id', 'taskhistory.description', 'u.name as user')
            .leftJoin('users as u', 'taskhistory.userId', 'u.id')
            .whereRaw(`taskhistory.id = ${req.params.id}`)
            .first()
            .then(tk => res.json(tk))
            .catch(err => res.status(500).send(err));
    }

    return { save, remove, get, getById };
}