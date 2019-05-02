module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const save = async (req, res) => {
        const stepactived = { ...req.body };
        if (req.params.id) stepactived.id = req.params.id;
        console.log(stepactived);
        try {
            if (stepactived.projectId) {
                existsOrError(stepactived.projectId, 'Projeto não encontrado');
            }
            if (stepactived.stepId) {
                existsOrError(stepactived.stepId, 'Etapa não encontrada')
            }
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (stepactived.id) {
            app.db('stepactived')
                .update(stepactived)
                .where({ id: stepactived.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('stepactived')
                .insert(stepactived)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    };

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('stepactived')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'A etapa solicitada não foir encontrada para esse projeto');

            res.status(204).send();
        } catch (msg) {
            res.status(500).send(msg);
        }
    };

    const get = (req, res) => {
        app.db('stepactived')
            .select('stepactived.id', 'p.name as project', 's.name as step')
            .leftJoin('project as p', 'stepactived.projecId', 'p.id')
            .leftJoin('step as s', 'stepactived.stepId', 's.id')
            .then(s => res.json({ data: s }))
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) => {
        app.db('stepactived')
            .select('stepactived.id', 'p.name as project', 's.name as step')
            .leftJoin('project as p', 'stepactived.projecId', 'p.id')
            .leftJoin('step as s', 'stepactived.stepId', 's.id')
            .whereRaw(`stepactived.id = ${req.params.id} AND stepactived.projectId = ${req.params.projectId}`)
            .first()
            .then(tk => res.json(tk))
            .catch(err => res.status(500).send(err));
    }

    return { save, remove, get, getById };
}