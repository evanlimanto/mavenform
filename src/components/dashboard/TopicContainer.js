import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { map } from 'lodash';
import { compose } from 'redux';

import ItemTypes from './ItemTypes';
import TopicCard from './TopicCard';

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
    const { problemSetTopics, connectDropTarget, selectTopic, selectedTopic } = this.props;
    const topics = (problemSetTopics && problemSetTopics.length > 0) ? map(problemSetTopics,
      (topic, key) =>
        <TopicCard key={key} topicid={topic.topicid} topic={topic.topic} concept={topic.concept} selectTopic={selectTopic} selected={selectedTopic === topic.topicid} canSelect={true} />)
      : "No Topics yet!";
    return (
      connectDropTarget(<div style={{ border: "1px solid grey" }}>{topics}</div>)
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
