import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const students = await ContactsCollection.find();
  return students;
};

export const getContactById = async (contactId) => {
  const student = await ContactsCollection.findById(contactId);
  return student;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const upsertContact = async (contactId, payload, options = {}, isPatch = false) => {
  const updateOperation = isPatch ? { $set: payload } : payload;
  
  const data = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    updateOperation,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  
  if (!data || !data.value) return null;
  
  return {
    contact: data.value,
    isNew: Boolean(data?.lastErrorObject?.upserted),
  };
};
