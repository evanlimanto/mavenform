import ReactGA from 'react-ga';
const _ = require('lodash');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('af9797f751c2f22b4ba5f77f20cc6cc5');

function handleEvent(category, action, label="") {
  ReactGA.event({
    category,
    action,
    label,
  });
  mixpanel.track(category, {action, label});
}

export {
  handleEvent
};
