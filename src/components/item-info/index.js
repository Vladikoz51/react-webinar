import React from "react";
import propTypes from 'prop-types';
import './styles.css';
import numberFormat from "../../utils/number-format";

function ItemInfo({description, madeIn, category, edition, price, onAdd}) {
  return (
    <div className='ItemInfo'>
      <p className='ItemInfo__description'>{description}</p>
      <p className='ItemInfo__madeIn'>Страна производитель: {`${madeIn.title} ${madeIn.code}`}</p>
      <p className='ItemInfo__category'>Категория: {category.title}</p>
      <p className='ItemInfo__edition'>Год выпуска: {edition}</p>
      <h3 className='ItemInfo__price'>Цена: {numberFormat(price || 0)} ₽</h3>
      <button className='ItemInfo__add-button' onClick={onAdd}>Добавить</button>
    </div>
  );
}

ItemInfo.propTypes = {
  description: propTypes.string,
  madeIn: propTypes.object,
  category: propTypes.object,
  edition: propTypes.number,
  price: propTypes.number
}

ItemInfo.defaultProps = {
  description: 'Описание отсутствует',
  madeIn: {title: '', code: ''},
  category: {title: '', _id: ''},
  edition: 'Нет данных'
}

export default React.memo(ItemInfo);
