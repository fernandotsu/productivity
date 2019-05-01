module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const save = async (req, res) => {
        const task = { ...req.body };
        if (req.params.id) task.id = req.params.id;
        console.log(task);
        try {
            existsOrError(task.name, 'Nome não informado');
            existsOrError(task.projectId, 'Projeto não informado');
            existsOrError(task.stepId, 'Etapa não informado');
            existsOrError(task.allocated1, 'É necessário alocar um usuário');
            existsOrError(task.startAt, 'Data de início não informado');
            existsOrError(task.endAt, '/data final não informado');
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (task.id) {
            app.db('task')
                .update(task)
                .where({ id: task.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('task')
                .insert(task)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            app.db('taskhistory')
                .where({ taskId: req.params.id })
            const rowsDeleted = await app.db('task')
                .where({ id: req.params.id });

            existsOrError(rowsDeleted, 'Tarefa não encontrada');

            res.status(204).send();
        } catch (msg) {
            res.status(500).send(msg);
        }
    }

    const get = (req, res) => {
        app.db('task')
            .select('task.id', 'task.name', 'task.stepId', 'task.createdAt', 'task.startAt',
                'task.endAt', 'uc.name as createdBy', 'u1.name as allocated1', 'u2.name as allocated2',
                'u3.name as allocated3')
            .leftJoin('users as uc', 'task.createdBy', 'uc.id')
            .leftJoin('users as u1', 'task.allocated1', 'u1.id')
            .leftJoin('users as u2', 'task.allocated2', 'u2.id')
            .leftJoin('users as u3', 'task.allocated3', 'u3.id')
            .then(t => res.json({ data: t }))
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) => {
        app.db('task')
            .select('task.id', 'task.name', 'task.stepId', 'task.createdAt', 'task.startAt',
                'task.endAt', 'uc.name as createdBy', 'u1.name as allocated1', 'u2.name as allocated2',
                'u3.name as allocated3')
            .leftJoin('users as uc', 'task.createdBy', 'uc.id')
            .leftJoin('users as u1', 'task.allocated1', 'u1.id')
            .leftJoin('users as u2', 'task.allocated2', 'u2.id')
            .leftJoin('users as u3', 'task.allocated3', 'u3.id')
            .whereRaw(`task.id = ${req.params.id}`)
            .first()
            .then(t => res.json(t))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById };
}