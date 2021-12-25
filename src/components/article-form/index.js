import React from 'react';
import propTypes from 'prop-types';
import {cn} from '@bem-react/classname'
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
      <Input onChange={e => callbacks.setFormTitle(e)} value={formData.title} theme="big"/>
      <Textarea onChange={e => callbacks.setFormDescription(e)} value={formData.description} placeholder={'Введите описание товара'}/>
      <Select onChange={e => callbacks.setFormMaidIn(e)} value={formData.maidIn?._id} options={countries}/>
      <Select onChange={e => callbacks.setFormCategory(e)} value={formData.category?._id} options={categories}/>
      <Input onChange={e => callbacks.setFormEdition(e)}
             type={'number'}
             value={formData.edition}
             min={0}
             max={new Date().getFullYear()}
             theme={'medium'}
      />
      <Input onChange={e => callbacks.setFormPrice(e)}
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
