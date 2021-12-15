import React from 'react';
import Main from "./main";
import {Route, Routes} from "react-router-dom";
import Item from "./item";

/**
 * Приложение
 */
function App() {
  return (
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path="/items/:itemId" element={<Item/>} />
    </Routes>
  );
}

export default React.memo(App);
