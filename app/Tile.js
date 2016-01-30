import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const tileSource = {
  canDrag(props) {
    return props.canMove;
  },

  beginDrag(props, monitor, component) {
    return {
      value: props.value,
    };
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    props.onMove(props.x, props.y);
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

class Tile extends Component {
  render() {
    const { value, canMove, isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div className={'tile' + (canMove ? ' moveable' : '') + (isDragging ? ' dragging' : '')}>
        <div className="value">
          {value}
        </div>
      </div>
    );
  }
}

module.exports = DragSource('tile', tileSource, collect)(Tile);
