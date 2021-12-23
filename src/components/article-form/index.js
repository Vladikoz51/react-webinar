import React from 'react';
import propTypes from 'prop-types';
import {cn} from '@bem-react/classname'
import './styles.css';

function ArticleForm({article, categories, countries, id, onSave, error}) {
  // CSS классы по БЭМ
  const className = cn('ArticleForm');

  return (
    <div className={className()}>
      <form className={className('Form')} onSubmit={(e) => onSave(id, e)}>
        <div className={className('Item')}>
          <label className={className('Label')}>Название:</label>
          <input className={`${className('Value')} ${className('Title')}`} type="text" defaultValue={article.title}/>
        </div>
        <div className={className('Item')}>
          <label className={className('Label')}>Описание:</label>
          <textarea className={`${className('Value')} ${className('Description')}`} defaultValue={article.description}/>
        </div>
        <div className={className('Item')}>
          <label className={className('Label')}>Страна производитель:</label>
          <select className={`${className('Value')} ${className('Country')}`} defaultValue={article.maidIn?._id}>
            {countries.map(item => (
              <option key={item._id} value={item._id}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className={className('Item')}>
          <label className={className('Label')}>Категория:</label>
          <select className={`${className('Value')} ${className('Category')}`} defaultValue={article.category?._id}>
            {categories.map(item => (
              <option key={item._id} value={item._id}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className={className('Item')}>
          <label className={className('Label')}>Год выпуска:</label>
          <input className={`${className('Value')} ${className('Edition')}`}
                 type="number"
                 defaultValue={article.edition}
                 min={0}
                 max={new Date().getFullYear()}
          />
        </div>
        <div className={className('Item')}>
          <label className={className('Label')}>Цена (₽):</label>
          <input
            className={`${className('Value')} ${className('Price')}`}
            type="number"
            defaultValue={article.price}
            min={0}
            step={0.01}
          />
        </div>
        <button className={className('Submit')} type='submit'>Сохранить</button>
      </form>
      {error !== {} && (
        <p className={className('Error')}>{error.message}</p>
      )}
    </div>
  )
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
