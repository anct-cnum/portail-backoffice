const { isAscending, Order, toggleSort } = require('./Sort.presenter');

describe('sort presenter', () => {
  it('devrait indiquer que l\'ordre du tri est croissant', () => {
    const sort = {
      field: 'name',
      order: Order.Ascending
    };

    expect(isAscending('name', sort)).toBe(true);
  });

  it('devrait indiquer que l\'ordre du tri n\'est pas croissant', () => {
    const sort = {
      field: 'name',
      order: Order.Descending
    };

    expect(isAscending('name', sort)).toBe(false);
  });

  it('devrait indiquer que l\'ordre du tri n\'est pas croissant quand le champ ne correspond pas', () => {
    const sort = {
      field: 'name',
      order: Order.Ascending
    };

    expect(isAscending('city', sort)).toBe(false);
  });

  it('should devrait trier par ordre décroissant', () => {
    const sort = {
      field: 'name',
      order: Order.Ascending
    };

    expect(toggleSort('name', sort)).toStrictEqual({
      field: 'name',
      order: Order.Descending
    });
  });

  it('should devrait trier par ordre décroissant', () => {
    const sort = {
      field: 'name',
      order: Order.Descending
    };

    expect(toggleSort('name', sort)).toStrictEqual({
      field: 'name',
      order: Order.Ascending
    });
  });
});
