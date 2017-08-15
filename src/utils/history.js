import ReactGA from 'react-ga';
import { canUseDOM } from '../utils';
import { mixpanel } from '../events';

const historyCreator = canUseDOM ? require('history').createBrowserHistory : require('history').createMemoryHistory;
const history = historyCreator();

let pageStartTime = Date.now();
let currentPage = canUseDOM ? document.location.pathname : null;
history.listen((location, action) => {
  // Track all pageviews, "PUSH" and "POP"
  ReactGA.set({ path: location.pathname });
  ReactGA.pageview(location.pathname);
  let currentTime = Date.now();
  let timeSpentOnPageSeconds = Math.floor(currentTime - pageStartTime) / 1000;
  mixpanel.track('Page View Length', { page: currentPage, length_seconds: timeSpentOnPageSeconds });
  mixpanel.track('Page Navigation', { previous_page: currentPage, next_page: location.pathname });

  pageStartTime = currentTime;
  currentPage = location.pathname;
})

export default history;
