import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../midlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValid } from '../midlewares/isValid.js';
import { authenticate } from '../midlewares/authenticate.js';
import { isUser } from '../midlewares/isUser.js';

const router = Router();

router.use(authenticate);
router.get('/', isUser, ctrlWrapper(getContactsController));
router.get('/:contactId', isUser, ctrlWrapper(getContactsByIdController));
router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', isUser, ctrlWrapper(deleteContactController));
router.put(
  '/:contactId',
  isUser,
  isValid,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',
  isUser,
  isValid,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
