import React, {useCallback, useMemo} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,

    category: state.catalog.params.category,
    categories: state.categories.items
  }));

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'key', title: 'По коду'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  }

  const callbacks = {
    onSort: useCallback(sort => store.catalog.setParams({sort}), [store]),
    onSearch: useCallback(query => store.catalog.setParams({query, page: 1}), [store]),
    onCategory: useCallback(category => store.catalog.setParams({category, page: 1}), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store]),
  }

  function parseCategories(items) {
    let sortedCategories = [{value: '', title: 'Все'}];

    function getCategory(parent = null, nestDegree = 0) {
      for (const item of items) {
        const newItem = {...item};
        if (parent === null && newItem.parent === parent) {
          sortedCategories.push({value: newItem._id, title: newItem.title});
          getCategory(newItem._id, nestDegree + 1);
        }
        else if (newItem.parent !== null && newItem.parent._id === parent) {
          newItem.title = '- '.repeat(nestDegree) + newItem.title;
          sortedCategories.push({value: newItem._id, title: newItem.title});
          getCategory(newItem._id, nestDegree + 1);
        }
      }
    }
    getCategory();
    return sortedCategories;
  }

  return (
    <LayoutTools>
      <Select onChange={callbacks.onCategory} value={select.category} options={parseCategories(select.categories)}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);
