import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export const isUser = async (req, res, next) => {
  const userId = req.user._id;

  if (!userId) {
    next(createHttpError(401, 'User ID not found'));
    return;
  }

  const contact = await ContactsCollection.findOne({ _id: userId });

  if (contact) {
    next();
    return;
  }

  next(createHttpError(404, 'Contact not found'));
  return;
};
