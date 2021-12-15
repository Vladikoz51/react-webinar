import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Basket from "../basket";

function Main() {
  const select = useSelector(state => ({
    name: state.modals.name,

    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    limit: state.catalog.limit,
    currentPage: state.catalog.currentPage
  }));

  const store = useStore();
    // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(select.limit);
  }, []);

  // добавлен колбэк loadPageItems для загрузки соответствующих элементов для каждой страницы
  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
    loadPageItems: useCallback((limit, currentPage) => {
      store.catalog.load(limit, currentPage);
    }, [store])
  }

  const renders = {
    item: useCallback(item => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
        <List items={select.items} renderItem={renders.item}/>
        <Pagination
          count={select.count}
          limit={select.limit}
          currentPage={select.currentPage}
          loadPageItems={callbacks.loadPageItems}
        />
      </Layout>
      {select.name === 'basket' && <Basket/>}
    </>
);
}

export default React.memo(Main);
