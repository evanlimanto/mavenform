import React, { Component } from 'react';
import { compose } from 'redux';
import { DragSource } from 'react-dnd';
import classnames from 'classnames';

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
    const { canSelect, connectDragSource, isDragging, topic, concept, topicid, selectTopic, selected } = this.props;
    const opacity = isDragging ? 0.4 : 1.0;
    return connectDragSource(
      <div style={{ opacity }}>{topic} - {concept}&nbsp;
        {canSelect ? <a className={classnames({"admin-function": true, highlighted: selected})} onClick={() => selectTopic ? selectTopic(topicid) : null}>Select</a> : null}
      </div>
    );
  }
}

const enhance = compose(
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
);

export default enhance(TopicCard);
