import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { map } from 'lodash';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';
import initializeTracking from './tracking';
import { canUseDOM } from './utils';
import { configureStore, initStore } from './utils/configureStore';
import { ReactGA } from './events';
import ScrollToTop from './components/scrolltotop';
import history from './utils/history';

import './css/Fonts.css';
import './css/General.css';
import './css/Typography.css';
import './css/Navbar.css';
import './css/Errors.css';
import './css/Cards.css';
import './css/Home.css';
import './css/School.css';
import './css/Exam.css';
import './css/Course.css';
import './css/Marketing.css';
import './css/Modals.css';
import './css/Mobile.css';
import './css/Admin.css';
import './css/Info.css';

ReactGA.set({ path: window.location.pathname });
ReactGA.pageview(window.location.pathname);

if (canUseDOM) {
  window.Intercom("boot", { app_id: "dpdcfp8e" });
  if (localStorage.profile) {
    const profile = JSON.parse(localStorage.profile);
    window.Intercom("update", {
      name: profile.user_metadata.username, // Full name
      email: profile.email, // Email address
      created_at: new Date(),
    });
  }
}

const store = configureStore();
initStore(store); // async
initializeTracking();

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <Switch>
          {map(routes, (route, key) => <Route key={key} path={route.path} component={route.component} exact={route.exact} />)}
        </Switch>
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
