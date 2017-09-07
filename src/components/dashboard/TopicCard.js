import React, { Component } from 'react';
import { compose } from 'redux';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    console.log(item);
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      if (dropResult.name === "problemSetTopics") {
        dropResult.addTopicToProblemSet(item.id)
      } else if (dropResult.name === "topicList") {
        dropResult.removeTopicFromProblemSet(item.id)
      }
    }
  }
};

class TopicCard extends Component {
  render() {
    const { connectDragSource, isDragging, topic, concept } = this.props;
    const opacity = isDragging ? 0.4 : 1.0;
    return connectDragSource(<div style={{ opacity }}>{topic} - {concept}</div>);
  }
}

const enhance = compose(
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
);

export default enhance(TopicCard);
