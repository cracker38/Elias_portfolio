import { Router } from 'express';
import { body } from 'express-validator';
import { createMessage, listMessages, markMessageRead } from '../controllers/contactController.js';
import { requireAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required.'),
    body('email').isEmail().withMessage('A valid email is required.'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters.'),
  ],
  handleValidation,
  createMessage
);

router.get('/', requireAuth, listMessages);
router.patch('/:id/read', requireAuth, markMessageRead);

export default router;
