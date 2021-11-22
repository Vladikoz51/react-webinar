import React from 'react';
import {Item} from "./item";

export class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  render() {
    return (
      <div
        className={'List__item' + (this.state.selected ? ' List__item_selected' : '')}
        onClick={() => {this.setState({selected: !this.state.selected});}}
      >
        <Item store={this.props.store} item={this.props.item} />
      </div>
    );
  }
}