import StoreModule from "../module";

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  // в стейт каталога добавлены свойства limit (максимальное количество элементов на странице) и
  // count (общее количество элементов каталога)
  initState() {
    return {
      items: [],
      count: 0,
      limit: 10,
    };
  }

  /**
   * Загрузка списка товаров
   */
  // метод изменен таким образом чтобы принимая, параметры limit и skip формировал соответствующие
  // http запросы
  async load(limit, skip = 0) {
    let request = `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`;
    const response = await fetch(request);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count,
      limit: limit
    });
  }
}

export default CatalogStore;
