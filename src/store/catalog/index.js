import StoreModule from "../module";

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  // в стейт каталога добавлены свойства limit (максимальное количество элементов на странице),
  // count (общее количество элементов каталога), currentPage (текущая страница каталога)
  initState() {
    return {
      items: [],
      count: 0,
      limit: 10,
      currentPage: null,
    };
  }

  /**
   * Загрузка списка товаров
   */
  // метод изменен таким образом, что принимая параметры limit и pageIndex формировал бы соответствующие
  // http запросы
  async load(limit, pageIndex = 1) {
    let request = `/api/v1/articles?limit=${limit}&skip=${(pageIndex - 1) * limit}&fields=items(*),count`;
    const response = await fetch(request);
    const json = await response.json();
    this.setState({
      currentPage: pageIndex,
      items: json.result.items,
      count: json.result.count,
      limit: limit
    });
  }
}

export default CatalogStore;
