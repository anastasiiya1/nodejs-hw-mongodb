export const calculatePaginationData = (count, perPage, page) => {
  const totalPage = Math.ceil(count / perPage);
  const hasNextPage = page < totalPage;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPage,
    hasNextPage,
    hasPreviousPage,
  };
};
