import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function Pagination({pageAmount, renderPaginationItem}) {
  // создаем массив компонентов PaginationItem
  let items = [];
  for (let i = 1; i <= pageAmount; i++) {
    items.push(renderPaginationItem(i));
  }

  return (
    <div className='Pagination'>
      <ul className='Pagination__list'>
        {items}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  pageAmount: propTypes.number.isRequired,
  renderPaginationItem: propTypes.func.isRequired
}

export default React.memo(Pagination);
