import express from 'express';
import * as controller from '../controllers/machine/machine.controller';
import * as dataController from '../controllers/machine/machine.data.controller';

const router = express.Router();

router.get('/', controller.get);
router.get('/data', dataController.getData);

module.exports = router;
