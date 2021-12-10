import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function PaginationItem({index, loadPageItems, limit}) {
  return (
    <li className='Pagination__item' key={index}>
      <button
        className='Pagination__button'
        onClick={
          () => loadPageItems(limit, (index - 1) * limit)
        }>
        {index}
      </button>
    </li>
  );
}

PaginationItem.propTypes = {
  pageAmount: propTypes.number.isRequired,
  loadPageItems: propTypes.func.isRequired,
  limit: propTypes.number,
}

PaginationItem.defaultProps = {
  limit: 10
}

export default React.memo(PaginationItem);

