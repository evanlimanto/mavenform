import ReactGA from 'react-ga';
import { canUseDOM } from '../utils';

const historyCreator = canUseDOM ? require('history').createBrowserHistory : require('history').createMemoryHistory;
const history = historyCreator();
history.listen((location, action) => {
  // Track all pageviews, "PUSH" and "POP"
  ReactGA.set({ path: location.pathname });
  ReactGA.pageview(location.pathname);
})

export default history;
