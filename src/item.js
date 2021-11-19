import React from "react";

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0
    }
  }

  render() {
    let title = this.state.clickCount > 0 ?
      this.props.item.title + ` | Выделялся ${this.state.clickCount} раз` :
      this.props.item.title;

    return (
      <div className='Item' onClick={() => this.setState({clickCount: this.state.clickCount + 1})}>
        <div className='Item__number'>{this.props.item.code}</div>
        <div className='Item__title'>{title}</div>
        <div className='Item__actions'>
          <button onClick={() => this.props.store.deleteItem(this.props.item.code)}>
            Удалить
          </button>
        </div>
      </div>
    );
  }
}