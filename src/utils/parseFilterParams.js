const parseContactType = (contactType) => {
  if (
    typeof contactType === 'string' &&
    ['work', 'home', 'personal'].includes(contactType)
  ) {
    return contactType;
  }
  return null;
};

const parseIsFavourite = (isFavourite) => {
  if (
    typeof isFavourite === 'string' &&
    ['true', 'false'].includes(isFavourite)
  ) {
    return isFavourite === 'true';
  }
  return null;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
