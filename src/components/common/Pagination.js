function Pagination({ pageCount, current, navigate }) {
  let previousPage = current - 1;
  let nextPage = current + 1;
  let lastPage = pageCount;
  let isFirstPage = current === 1;
  let isLastPage = current === lastPage;
  let showPrevious = current > 2;

  const onClick = (e, page) => {
    e.preventDefault();
    navigate(page);
}

  if (pageCount <= 1) {
    return (<ul className="pagination" />);
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage ? 'active' : ''}`}>
        <a href="/#" className="page-link" onClick={e => onClick(e, 1)}>1</a>
      </li>
      {
        (pageCount > 5 && current > 3) &&
        <li className="page-item disabled">
          <a href="/#" className="page-link">...</a>
        </li>
      }
      {
        showPrevious &&
        <li className="page-item">
          <a
            href="/#"
            className="page-link"
            onClick={e => onClick(e, previousPage)}>{previousPage}
          </a>
        </li>
      }
      {
        (!isFirstPage && !isLastPage) &&
        <li className="page-item active">
          <a
            href="/#"
            className="page-link"
            onClick={e => onClick(e, current)}>{current}
          </a>
        </li>
      }
      {
        (nextPage < lastPage) &&
        <li className="page-item">
          <a href="/#" className="page-link" onClick={e => onClick(e, nextPage)}>{nextPage}</a>
        </li>
      }
      {
        (current < pageCount - 2) &&
        <li className="page-item disabled">
          <a href="/#" className="page-link">...</a>
        </li>
      }
      <li className={`page-item ${isLastPage && 'active'}`}>
        <a href="/#" className="page-link" onClick={e => onClick(e, lastPage)}>{lastPage}</a>
      </li>
      {/*[...Array(pageCount).keys()].map(p => <button onClick={navigate.bind(this, p + 1)} className={`${p === current ? 'current' : ''}`}>{p + 1}</button>)*/}
    </ul>
  );
}

export default Pagination;
