module.exports = class Controller {
    constructor() {}

    async getAll(req, res) {
        res.json({ message: 'Get all items' });
    }

    async getOne(req, res) {
        res.json({ message: 'Get one item', id: req.params.id });
    }

    async create(req, res) {
        res.json({ message: 'Create an item', data: req.body });
    }

    async update(req, res) {
        res.json({ message: 'Update an item', id: req.params.id, data: req.body });
    }

    async delete(req, res) {
        res.json({ message: 'Delete an item', id: req.params.id });
    }
};