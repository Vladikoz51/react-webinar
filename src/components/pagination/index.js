import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function Pagination({count, limit, currentPage, loadPageItems}) {
  // считаем нужное количество страниц при заданном количестве элементов на страницу и общем
  // количестве элементов.
  const pageAmount = Math.floor(count / limit) < (count / limit) ?
    Math.floor(count / limit) + 1 : count / limit;

  let items = [];
  for (let i = 1; i <= pageAmount; i++) {
    const itemClass = i === currentPage ? 'Pagination__button_current' : 'Pagination__button';
    const item = (
      <li className='Pagination__item' key={i}>
        <button
          className={itemClass}
          onClick={
            () => {loadPageItems(i);}
          }
        >
          {i}
        </button>
      </li>
    );

    items.push(item);
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
  count: propTypes.number.isRequired,
  limit: propTypes.number.isRequired,
  currentPage: propTypes.number,
  loadPageItems: propTypes.func.isRequired
}

export default React.memo(Pagination);
