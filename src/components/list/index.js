import React from "react";
import propTypes from 'prop-types';
import Item from "../item";
import './styles.css';

function List({items, onAdd}){
  console.log('List');
  return (
    <div className='List'>{items.map(item =>
      <div className='List__item' key={item.code}>
        <Item item={item} onAdd={onAdd}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
}

List.defaultProps = {
  items: []
}

export default React.memo(List);
// export default List;