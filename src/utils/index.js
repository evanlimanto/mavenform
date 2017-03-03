import ReactGA from 'react-ga';

function handleEvent(category, action, label="") {
  ReactGA.event({
    category,
    action,
    label,
  });
}

export {
  handleEvent
};
