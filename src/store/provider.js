import React from 'react';
import propTypes from "prop-types";

/**
 * Контекст для Store
 * @type {React.Context<{}>}
 */
export const StoreContext = React.createContext({});

/**
 * Провайдер store.
 * Подключает контекст к приложению для доступа к хранилищу store.
 * Провайдер не обрабатывает изменения в store.
 * Тот кто использует состояние из store должен сам подписаться на их изменения.
 * напрямую store используется, чтобы вызвать его методы изменения состояния.
 */
function StoreProvider({store, children}) {
  // В провайдер передастся объект хранилища store,
  // после чего store можно получить через useContext(StoreContext) в любом компоненте
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

StoreProvider.propTypes = {
  store: propTypes.object.isRequired,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
}

export default React.memo(StoreProvider);
