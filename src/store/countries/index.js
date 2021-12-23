import StoreModule from "../module";

class CountriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: []
    };
  }

  /**
   * Загрузка списка стран-производителей товаров
   */
  async setCountries() {
    try {
      const response = await fetch('/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru');
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

export default CountriesStore;
