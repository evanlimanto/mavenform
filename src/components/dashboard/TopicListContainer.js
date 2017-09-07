import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { compose } from 'redux';
import { filter, includes, map, sortBy } from 'lodash';

import ItemTypes from './ItemTypes';
import TopicCard from './TopicCard';

const boxTarget = {
  drop(props) {
    return {
      name: 'topicList',
      addTopicToProblemSet: props.addTopicToProblemSet,
      removeTopicFromProblemSet: props.removeTopicFromProblemSet,
    }
  }
};

class TopicListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicList: null
    };
  }

  componentDidMount() {
    fetch('/getTopics')
      .then((response) => response.json())
      .then((json) => this.setState({ topicList: json }))
  }

  getTopicList() {
    const problemSetTopicIds = map(this.props.problemSetTopics, (topic) => topic.topicid);
    return map(sortBy(
      filter(this.state.topicList, (topic) => !includes(problemSetTopicIds, topic.id)), [(topic) => topic.topic, (topic) => topic.concept]), (topic, key) =>
      <TopicCard key={key} topicid={topic.id} topic={topic.topic} concept={topic.concept} />
    );
  }

  render() {
    const { connectDropTarget } = this.props;
    const topicList = this.getTopicList();
    return (
      connectDropTarget(<div style={{ height: "200px", overflowY: "scroll", border: "1px solid grey" }}>{topicList}</div>)
    );
  }
}

const enhance = compose(
  DropTarget(ItemTypes.CARD, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
)

export default enhance(TopicListContainer);
