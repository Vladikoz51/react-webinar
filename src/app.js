import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');

  // хук состояния для скрытия/отображения корзины покупок, так как это состояние используется в разных компонентах то
  // произвел поднятие состояния до компонента App
  const [isCartHidden, setIsCartHidden] = useState(true);

  // для добавления товара в корзину создадим колбэк onAddToCart и передадим его через компонент List каждому компоненту
  // Item
  const callbacks = {
    onAddToCart: useCallback((item) => store.addItemToCart(item), [store])
  }

  // const callbacks = {
  //   onCreateItem: useCallback(() => store.createItem(), [store]),
  //   onSelectItem: useCallback((code) => store.selectItem(code), [store]),
  //   onDeleteItem: useCallback((code) => store.deleteItem(code), [store])
  // }

  // Переменные для подсчета общей стоимости и общего количества товаров.
  let totalSum = 0;
  let totalAmount = 0;

  for (const cartElement of store.getState().cart) {
    totalAmount += cartElement.amount;
    totalSum += cartElement.amount * cartElement.price;
  }

  return (
    <Layout head={<h1>Кондитерская "Сладкоежка"</h1>}>
      <Controls
        isCartHidden={isCartHidden}
        setCartHidden={setIsCartHidden}
        totalSum={totalSum}
        totalAmount={totalAmount}
      />
      <List
        items={store.getState().items}
        onAdd={callbacks.onAddToCart}
      />
      <Cart
        cart={store.getState().cart}
        isCartHidden={isCartHidden}
        setCartHidden={setIsCartHidden}
        totalSum={totalSum}
        totalAmount={totalAmount}
      />
    </Layout>
  );
}

export default App;