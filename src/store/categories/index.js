import StoreModule from "../module";

class CategoriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: []
    };
  }

  /**
   * Загрузка списка категорий товаров
   */
  async setCategories() {
    try {
      const response = await fetch('/api/v1/categories?limit=*&fields=_id,parent,title');
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      const items = json.result.items;
      this.setState({items});
    }
    catch (e) {
      this.setState({
        items: []
      });
    }

  }
}

export default CategoriesStore;
