import React from "react";
import propTypes from 'prop-types';
import pluralRu from 'plural-ru'
import './styles.css';

function Controls({isCartHidden, setCartHidden, totalSum, totalAmount}){
  console.log('Controls');
  // запишем правильное склонение слова "товар" в переменную
  const rightWord = pluralRu(totalAmount, 'товар', 'товара', 'товаров');
  return (
    <div className='Controls'>
      <p className='Controls__cart-info'>
        В корзине: <strong>{totalAmount ? `${totalAmount} ${rightWord} / ${totalSum} \u20bd` : 'пусто'}</strong>
      </p>
      <button className='Controls__open-cart-btn' onClick={() => setCartHidden(!isCartHidden)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  isCartHidden: propTypes.bool.isRequired,
  setCartHidden: propTypes.func.isRequired
}

export default React.memo(Controls);
// export default Controls;
