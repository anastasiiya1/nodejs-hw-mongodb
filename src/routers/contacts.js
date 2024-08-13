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

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
  ctrlWrapper(getContactsByIdController),
);
router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',
  ctrlWrapper(deleteContactController),
);
router.put(
  '/:contactId',
  isValid,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',
  isValid,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
