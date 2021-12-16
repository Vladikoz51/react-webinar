import React from 'react';
import Main from "./main";
import {Route, Routes} from "react-router-dom";
import Item from "./item";
import Basket from "./basket";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 */
function App() {
  const select = useSelector(state => ({
    name: state.modals.name,
  }));

  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path="/items/:itemId" element={<Item/>} />
      </Routes>
      {select.name === 'basket' && <Basket/>}
    </>
);
}

export default React.memo(App);
