import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import LayoutForm from "../layout-form";
import Input from "../input";
import Textarea from "../textarea";
import Select from "../select";

function ArticleForm({formData, categories, countries, id, callbacks, error}) {

  return (
    <LayoutForm
      labels={['Название', 'Описание', 'Страна производитель', 'Категория', 'Год выпуска', 'Цена']}
      onSubmit={callbacks.onSave}
      id={id}
      error={error}
    >
      <Input onChange={value => callbacks.setFormTitle(value)} value={formData.title} theme="big"/>
      <Textarea onChange={value => callbacks.setFormDescription(value)} value={formData.description} placeholder={'Введите описание товара'}/>
      <Select onChange={value => callbacks.setFormMaidIn(value)} value={formData.maidIn?._id} options={countries}/>
      <Select onChange={value => callbacks.setFormCategory(value)} value={formData.category?._id} options={categories}/>
      <Input onChange={value => callbacks.setFormEdition(value)}
             type={'number'}
             value={formData.edition}
             min={0}
             max={new Date().getFullYear()}
             theme={'medium'}
      />
      <Input onChange={value => callbacks.setFormPrice(value)}
             type={'number'}
             value={formData.price}
             min={0}
             step={0.01}
             theme={'medium'}
      />
    </LayoutForm>
  );
}

ArticleForm.propTypes = {
  article: propTypes.object.isRequired,
  categories: propTypes.array,
  countries: propTypes.array,
  id: propTypes.string,
  onSave: propTypes.func
}

ArticleForm.defaultProps = {
  article: {},
  categories: [],
  countries: [],
  id: ''
}

export default React.memo(ArticleForm);
