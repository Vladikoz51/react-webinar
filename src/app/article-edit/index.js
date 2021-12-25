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
    await store.categories.setCategories();
  }, [id]);

  const select = useSelector(state => ({
    article: state.articleEdit.data,
    formData: state.articleEdit.formData,
    countries: state.articleEdit.countries,
    categories: state.categories.items,
    error: state.articleEdit.error,
    waiting: state.articleEdit.waiting
  }));

  const callbacks = {
    onSave: useCallback((id,e) => store.articleEdit.updateArticle(id, e), [store]),
    setFormTitle: useCallback((value) => store.articleEdit.updateFormData({title: value}), [store]),
    setFormDescription: useCallback((value) => store.articleEdit.updateFormData({description: value}), [store]),
    setFormMaidIn: useCallback((value) => store.articleEdit.updateFormData({maidIn: {_id: value}}), [store]),
    setFormCategory: useCallback((value) => store.articleEdit.updateFormData({category: {_id: value}}), [store]),
    setFormEdition: useCallback((value) => store.articleEdit.updateFormData({edition: value}), [store]),
    setFormPrice: useCallback((value) => store.articleEdit.updateFormData({price: value}), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <ArticleForm
          formData={select.formData}
          categories={select.categories}
          countries={select.countries}
          id={id}
          callbacks={callbacks}
          error={select.error}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit);
