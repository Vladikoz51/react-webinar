import StoreModule from "../module";

class ArticleEditStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      categories: [],
      countries: [],
      waiting: true,
      error: {}
    };
  }

  /**
   * Загрузка информации о товаре, списка категорий и списка стран.
   */
  async load(id) {
    this.updateState({
      data: {},
      categories: [],
      countries: [],
      waiting: true
    });

    try {
      // загрузка информации о товаре
      const dataResponse = await fetch(`/api/v1/articles/${id}`);
      const dataJson = await dataResponse.json();
      if (dataJson.error) throw new Error(dataJson.error);

      // загрузка категорий
      const categoriesResponse = await fetch('/api/v1/categories?limit=*&fields=_id,parent,title');
      const categoriesJson = await categoriesResponse.json();
      if (categoriesJson.error) throw new Error(categoriesJson.error);

      // загрузка стран
      const countriesResponse = await fetch('/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru');
      const countriesJson = await countriesResponse.json();
      if (countriesJson.error) throw new Error(countriesJson.error);

      this.updateState({
        data: dataJson.result,
        categories: categoriesJson.result.items,
        countries: countriesJson.result.items,
        waiting: false
      });

    }
    catch (e) {
      this.updateState({
        data: {},
        categories: [],
        countries: [],
        waiting: false
      });
    }
  }
}

export default ArticleEditStore;
