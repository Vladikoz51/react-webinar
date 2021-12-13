import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function PaginationItem({index, loadPageItems, limit, currentIndex, setCurrentIndex}) {
  const itemClass = index === currentIndex ? 'Pagination__button_current' : 'Pagination__button';
  return (
    <li className='Pagination__item'>
      <button
        className={itemClass}
        onClick={
          () => {
            loadPageItems(limit, (index - 1) * limit);
            setCurrentIndex(index);
          }
        }>
        {index}
      </button>
    </li>
  );
}

PaginationItem.propTypes = {
  index: propTypes.number.isRequired,
  loadPageItems: propTypes.func.isRequired,
  limit: propTypes.number,
}

PaginationItem.defaultProps = {
  limit: 10
}

export default React.memo(PaginationItem);

