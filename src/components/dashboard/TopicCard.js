import React, { Component } from 'react';
import { compose } from 'redux';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const cardSource = {
  beginDrag(props) {
    return {
      topicid: props.topicid,
      topic: props.topic,
      concept: props.concept,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    console.log(item, dropResult);
    if (dropResult) {
      if (dropResult.name === "problemSetTopics") {
        dropResult.addTopicToProblemSet(item)
      } else if (dropResult.name === "topicList") {
        dropResult.removeTopicFromProblemSet(item)
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
