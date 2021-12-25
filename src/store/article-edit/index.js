import StoreModule from "../module";

class ArticleEditStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      countries: [],
      formData: {},
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
      countries: [],
      waiting: true
    });

    try {
      // загрузка информации о товаре
      const dataResponse = await fetch(`/api/v1/articles/${id}`);
      const dataJson = await dataResponse.json();
      if (dataJson.error) throw new Error(dataJson.error);

      // загрузка стран
      const countriesResponse = await fetch('/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru');
      const countriesJson = await countriesResponse.json();
      if (countriesJson.error) throw new Error(countriesJson.error);

      this.updateState({
        data: dataJson.result,
        countries: countriesJson.result.items,
        formData: {
          _id: dataJson.result._id,
          title: dataJson.result.title,
          description: dataJson.result.description,
          price: dataJson.result.price,
          maidIn: {
            _id: dataJson.result.maidIn._id
          },
          edition: dataJson.result.edition,
          category: {
            _id: dataJson.result.category._id
          }
        },
        waiting: false
      });

    }
    catch (e) {
      this.updateState({
        data: {},
        countries: [],
        waiting: false
      });
    }
  }

  /**
   * Отправка запроса на редактирование товара.
   */

  async updateArticle(id, e) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/articles/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(this.getState().formData) // body data type must match "Content-Type" header
      });
      const json = await response.json();
      // если с сервера вернулась ошибка сохраняем её в стейт
      if (json.error) {
        this.updateState({
          error: json.error
        });
      }
      else {
        // обновляем стейт чтобы изменения отобразились сразу после сохранения
        this.updateState({
          data: {
            ...this.getState().article,
            ...this.getState().formData,
          },
          error: {}
        });
      }
    }
    catch (e) {
      console.log(e.message);
    }
  }

  updateFormData(data) {
    const newData = {
      ...this.getState().formData,
      ...data
    }
    this.updateState({formData: newData})
  }
}

export default ArticleEditStore;
