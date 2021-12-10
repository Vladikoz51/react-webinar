import React from "react";
import propTypes from 'prop-types';
import './styles.css';
import CartItem from "../cartItem";

function Cart({cart, isCartHidden, setCartHidden, totalSum, totalAmount}) {
  console.log('Cart');

  // определяем будет ли отражаться корзина покупок
  let cartClass = isCartHidden ? 'Cart Cart_hidden' : 'Cart';

  return (
    <div className={cartClass}>
      <div className='Cart__header'>
        <h1 className='Cart__title'>Корзина</h1>
        <button className='Cart__close-btn' onClick={() => setCartHidden(!isCartHidden)}>Закрыть</button>
      </div>
      <ul className='Cart__list'>
        {cart.map(
          (item, index) => <CartItem item={item} key={item.code} index={index + 1}/>
        )}
      </ul>
      <div className='Cart__total'>
        <div className='Cart__total-name'>Итого</div>
        <div className='Cart__total-sum'>{totalSum + ' \u20bd'}</div>
        <div className='Cart__total-amount'>{totalAmount + ' шт.'}</div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired
}

Cart.defaultProps = {
  cart: []
}

export default React.memo(Cart);