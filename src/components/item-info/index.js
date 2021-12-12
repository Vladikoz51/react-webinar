import React from "react";
import propTypes from 'prop-types';
import './styles.css';
import numberFormat from "../../utils/number-format";

function ItemInfo({description, madeIn, category, edition, price, onAdd}) {
  return (
    <div className='ItemInfo'>
      <p className='ItemInfo__description'>{description}</p>
      <p className='ItemInfo__madeIn'>Страна производитель: <strong>{`${madeIn.title} ${madeIn.code}`}</strong></p>
      <p className='ItemInfo__category'>Категория: <strong>{category.title}</strong></p>
      <p className='ItemInfo__edition'>Год выпуска: <strong>{edition}</strong></p>
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
