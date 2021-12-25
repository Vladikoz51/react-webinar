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

  sortCategories(items) {
    let sortedCategories = [];

    function getCategory(parent = null, nestDegree = 0) {
      for (const item of items) {
        if ( (parent === null && item.parent === parent) || (item.parent !== null && item.parent._id === parent) ) {
          sortedCategories.push({
            value: item._id,
            title: item.title,
            nestDegree});
          getCategory(item._id, nestDegree + 1);
        }
      }
    }
    getCategory();
    return sortedCategories;
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
      this.setState({items: this.sortCategories(items)});
    }
    catch (e) {
      this.setState({
        items: []
      });
    }
  }
}

export default CategoriesStore;
