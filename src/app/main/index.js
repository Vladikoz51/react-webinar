import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import PaginationItem from "../../components/pagination-item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    limit: state.catalog.limit,
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
    loadPageItems: useCallback((limit, skip) => {
      store.catalog.load(limit, skip);
    }, [store])
  }

  // добавлен колбэк для рендера кнопок пагинации
  const renders = {
    item: useCallback(item => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
    paginationItem: useCallback((index) => {
      return <PaginationItem
        index={index}
        key={index}
        loadPageItems={callbacks.loadPageItems}
        limit={select.limit}/>
    }, [callbacks.loadPageItems])
  }

  // считаем нужное количество страниц при заданном количестве элементов на страницу и общем
  // количестве элементов.
  const pageAmount = Math.floor(select.count / select.limit) < (select.count / select.limit) ?
    Math.floor(select.count / select.limit) + 1 :
    select.count / select.limit;

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination pageAmount={pageAmount} renderPaginationItem={renders.paginationItem}/>
    </Layout>
  );
}

export default React.memo(Main);
