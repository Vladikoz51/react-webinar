import React, {useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import ArticleForm from "../../components/article-form";

function ArticleEdit() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();
  const id = params.id;

  // Начальная загрузка
  useInit(async () => {
    await store.articleEdit.load(id);
  }, [id]);

  const select = useSelector(state => ({
    article: state.articleEdit.data,
    countries: state.articleEdit.countries,
    categories: state.articleEdit.categories,
    error: state.articleEdit.error,
    waiting: state.articleEdit.waiting
  }));

  async function handleSubmit(id, e) {
    e.preventDefault();
    const form = e.target;
    const title = form[0].value;
    const description = form[1].value;
    const countryId = form[2].value;
    const categoryId = form[3].value;
    const editionYear = form[4].value;
    const price = form[5].value;

    const data = {
      _id: id,
      title: title,
      description: description,
      price: parseFloat(price),
      maidIn: {
        _id: countryId
      },
      edition: parseInt(editionYear),
      category: {
        _id: categoryId
      }
    }

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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      const json = await response.json();
      // если с сервера вернулась ошибка сохраняем её в стейт
      if (json.error) {
        store.articleEdit.updateState({
          error: json.error
        });
      }
      else {
        // обновляем стейт чтобы изменения отобразились сразу после сохранения
        store.articleEdit.updateState({
          data: {
            ...select.article,
            ...data,
          },
          error: {}
        });
      }
    }
    catch (e) {
      console.log(e.message);
    }
  }

  function sortCategories(items) {
    let sortedCategories = [];

    function getCategory(parent = null, nestDegree = 0) {
      for (const item of items) {
        const newItem = {...item};
        if (parent === null && newItem.parent === parent) {
          sortedCategories.push(newItem);
          getCategory(newItem._id, nestDegree + 1);
        }
        else if (newItem.parent !== null && newItem.parent._id === parent) {
          sortedCategories.push(newItem);
          getCategory(newItem._id, nestDegree + 1);
        }
      }
    }
    getCategory();
    return sortedCategories;
  }

  const callbacks = {
    onSave: useCallback((id,e) => handleSubmit(id, e), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <ArticleForm
          article={select.article}
          categories={sortCategories(select.categories)}
          countries={select.countries}
          id={id}
          onSave={callbacks.onSave}
          error={select.error}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit);
