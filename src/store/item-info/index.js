import StoreModule from "../module";

class ItemInfoStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      title: '',
      description: 'Описание отсутствует',
      madeIn: {title: '', code: ''},
      category: {title: '', _id: ''},
      edition: null,
      price: null
    };
  }

  /**
   * Загрузка информации о товаре
   */
  // метод изменен таким образом чтобы принимая, параметры limit и skip формировал соответствующие
  // http запросы
  async loadItemInfo(id) {
    let request = `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`;
    const response = await fetch(request);
    const json = await response.json();
    this.setState({
      title: json.result.title,
      description: json.result.description,
      madeIn: json.result.maidIn,
      category: json.result.category,
      edition: json.result.edition,
      price: json.result.price
    });
  }
}

export default ItemInfoStore;
