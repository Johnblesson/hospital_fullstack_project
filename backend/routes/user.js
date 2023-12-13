import express from 'express';
import controller from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import { ROLE, authRole } from '../middleware/authRole.js';
// import authRole from '../middleware/authRole.js';

const router = express.Router();

router.post('/', controller.add);
router.get('/', auth, controller.getAll);

router.get('/:id', auth, authRole(ROLE.ADMIN), controller.getById); //authRole(ROLE.ADMIN),
router.delete('/:id', auth, authRole(ROLE.ADMIN), controller.deleteOne);
router.put('/:id', auth, authRole(ROLE.ADMIN), controller.update);

export default router;
