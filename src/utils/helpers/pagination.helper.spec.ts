import { expect, it } from 'vitest';
import PaginationHelper from './pagination.helper';

const RESULT: [any[], number] = [[1, 2, 3, 4, 5], 5];

it('should contains the IPagination attributes', () => {
  const resultPaginated = PaginationHelper.paginate(RESULT, 10, 1);

  expect(resultPaginated).toHaveProperty('data');
  expect(resultPaginated).toHaveProperty('totalItems');
  expect(resultPaginated).toHaveProperty('totalPages');
  expect(resultPaginated).toHaveProperty('itemsPerPage');
  expect(resultPaginated).toHaveProperty('page');
});

it('should have 3 pages with 2 items per page (size=2, page=1)', () => {
  const resultPaginated = PaginationHelper.paginate(RESULT, 2, 2);

  expect(resultPaginated.data).toEqual(RESULT[0]);
  expect(resultPaginated.totalItems).toBe(5);
  expect(resultPaginated.totalPages).toBe(3);
  expect(resultPaginated.itemsPerPage).toBe(2);
  expect(resultPaginated.page).toBe(2);
});
