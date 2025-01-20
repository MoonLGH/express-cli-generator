// templates/controller.ts
export class Controller {
    constructor() {}

    async getAll(req: any, res: any) {
        res.json({ message: 'Get all items' });
    }

    async getOne(req: any, res: any) {
        res.json({ message: 'Get one item', id: req.params.id });
    }

    async create(req: any, res: any) {
        res.json({ message: 'Create an item', data: req.body });
    }

    async update(req: any, res: any) {
        res.json({ message: 'Update an item', id: req.params.id, data: req.body });
    }

    async delete(req: any, res: any) {
        res.json({ message: 'Delete an item', id: req.params.id });
    }
}