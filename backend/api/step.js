module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const save = async (req, res) => {
        const step = { ...req.body };
        if (req.params.id) step.id = req.params.id;

        try {
            existsOrError(step.name, 'Etapa não especificada');

            const stepFromDB = await app.db('step')
                .where({ name: step.name }).first();
            if (!step.id) {
                notExistsOrError(stepFromDB, 'Etapa já cadastrada');
            }
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (step.id) {
            app.db('step')
                .update(step)
                .where({ id: step.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(500))
        } else {
            var sequencialOrdem = 1;
            const stepOrdem = await app.db('step')
                .select('ordem');

            if (stepOrdem.length > 0) {
                sequencialOrdem = stepOrdem.sort((a, b) => {
                    return b.ordem - a.ordem
                })[0].ordem;
            }

            step.ordem = sequencialOrdem + 1;

            app.db('step')
                .insert(step)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    };

    const remove = async (req, res) => {
        try {
            const tasks = await app.db('task')
                .where({ stepId: req.params.id });
            notExistsOrError(tasks, 'A etapa está sendo usada por uma tarefa');

            const rowsDeleted = await app.db('step')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'Etapa não encontrado');

            res.status(204).send();
        } catch (msg) {
            res.status(500).send(msg);
        }
    };

    const get = (req, res) => {
        app.db('step')
            .select('id', 'name', 'ordem')
            .then(s => res.json({ data: s }))
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) => {
        app.db('step')
            .where({ id: req.params.id })
            .first()
            .then(st => {
                st.content = st.content.toString();
                return res.json(st);
            })
            .catch(err => res.status(500).send(err));
    }

    return { save, remove, get, getById };
}