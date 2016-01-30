import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const tileTarget = {
  canDrop() {
    return true;
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class EmptyTile extends Component {
  render() {
    const { isOver, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className={'tile empty-tile' + (isOver ? ' empty-tile-over' : '')}>
      </div>
    );
  }
}

module.exports = DropTarget('tile', tileTarget, collect)(EmptyTile);
