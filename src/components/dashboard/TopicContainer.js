import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { compose } from 'redux';
import ItemTypes from './ItemTypes';

const boxTarget = {
  drop(props) {
    return {
      name: 'problemSetTopics',
      addTopicToProblemSet: props.addTopicToProblemSet,
      removeTopicFromProblemSet: props.removeTopicFromProblemSet,
    };
  }
};

class TopicContainer extends Component {
  render() {
    const { problemSetTopics, connectDropTarget } = this.props;
    return (
      connectDropTarget(<div style={{ border: "1px solid grey" }}>{problemSetTopics}</div>)
    );
  }
}

const enhance = compose(
  DropTarget(ItemTypes.CARD, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }))
);

export default enhance(TopicContainer);
