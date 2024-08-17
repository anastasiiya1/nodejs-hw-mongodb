import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValid = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(400, 'Id is not valid');
  }
  next();
};
