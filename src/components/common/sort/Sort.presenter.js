export const Order = {
  Ascending: 1,
  Descending: -1
};

export const isAscending = (field, sort) => sort.order === Order.Ascending && sort.field === field;

export const toggleSort = (field, sort) => ({
  field,
  order: sort.order === Order.Ascending ? Order.Descending : Order.Ascending
});
