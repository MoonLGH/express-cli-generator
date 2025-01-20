const express = require('express');
const Controller = require('./controller');

const router = express.Router();
const controller = new Controller();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;