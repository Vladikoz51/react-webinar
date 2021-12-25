import React from "react";
import {cn} from "@bem-react/classname";
import PropTypes from "prop-types";
import './styles.css';
import propTypes from "prop-types";

function LayoutForm({children, onSubmit, id, labels, error}) {

  // CSS классы по БЭМ
  const className = cn('LayoutForm');

  return (
    <div className={className()}>
      <form className={className('Form')} onSubmit={(e) => onSubmit(id, e)}>
        {React.Children.map(children, (child, index) => (
          <div key={child.key} className={className('Item')}>
            <label className={className('Label')}>{`${labels[index]}:`}</label>
            {child}
          </div>
        ))}
        <button className={className('Submit')} type='submit'>Сохранить</button>
      </form>
      {error !== {} && (
        <p className={className('Error')}>{error.message}</p>
      )}
    </div>
  )
}

LayoutForm.propTypes = {
  children: PropTypes.node,
  labels: PropTypes.array,
  onSubmit: propTypes.func,
  error: propTypes.object
}

LayoutForm.defaultProps = {}

export default React.memo(LayoutForm);
