import StoreModule from "../module";

class CategoriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [
        {value: '', title: 'Все'}
      ]
    };
  }

  async setCategories() {
    const response = await fetch('/api/v1/categories?limit=*&fields=_id,parent,title');
    const json = await response.json();
    const items = json.result.items;
     this.setState({items: this.parseCategories(items)});
  }

  parseCategories(items) {
    let sortedCategories = [{value: '', title: 'Все'}];

    function getCategory(parent = null, nestDegree = 0) {
      for (const item of items) {
        if (parent === null && item.parent === parent) {
          // sortedCategories.push(item);
          sortedCategories.push({value: item._id, title: item.title});
          getCategory(item._id, nestDegree + 1);
        }
        else if (item.parent !== null && item.parent._id === parent) {
          item.title = '- '.repeat(nestDegree) + item.title;
          sortedCategories.push({value: item._id, title: item.title});
          // sortedCategories.push(item);
          getCategory(item._id, nestDegree + 1);
        }
      }
    }
    getCategory();
    return sortedCategories;
  }


}

export default CategoriesStore;
