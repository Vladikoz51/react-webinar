import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Item from "./item";

/**
 * Приложение
 */
function App() {
  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <>
      <Main/>
      {select.name === 'basket' && <Basket/>}
      <Item id='5ecba930b6b0b01fd3dd35de'/>
    </>
  );
}

export default React.memo(App);
