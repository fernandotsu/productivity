module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const get = (req, res) => {
        app.db('step')
            .select('id', 'name', 'ordem')
            .then(s => res.json({ data: s }))
            .catch(err => res.status(500).send(err));
    }

    return { get };
}