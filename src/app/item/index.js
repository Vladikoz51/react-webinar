import React, {useCallback, useEffect} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemInfo from "../../components/item-info";
import Basket from "../basket";
import {useParams} from "react-router";

function Item() {
  console.log("Item");
  const id = useParams().itemId;

  const select = useSelector(state => ({
    name: state.modals.name,

    amount: state.basket.amount,
    sum: state.basket.sum,

    title: state.itemInfo.title,
    description: state.itemInfo.description,
    madeIn: state.itemInfo.madeIn,
    category: state.itemInfo.category,
    edition: state.itemInfo.edition,
    price: state.itemInfo.price
  }));

  const store = useStore();
  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.itemInfo.loadItemInfo(id);
  }, [id]);

  const callbacks = {
    addToBasket: useCallback(() => store.basket.add(id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  }

  return (
    <>
      <Layout head={<h1>{select.title}</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
        <ItemInfo description={select.description}
                  madeIn={select.madeIn}
                  category={select.category}
                  edition={select.edition}
                  price={select.price}
                  onAdd={callbacks.addToBasket}/>
      </Layout>
      {select.name === 'basket' && <Basket/>}
    </>

  );
}

export default React.memo(Item);
