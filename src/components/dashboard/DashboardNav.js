import React, { Component } from 'react';
import { map, upperCase } from 'lodash';
import classnames from 'classnames';

import { canUseDOM } from '../../utils';
const cookies = canUseDOM ? require('browser-cookies') : null;

class DashboardNav extends Component {
  logout() {
    if (cookies)
      cookies.erase('dashboard_user');
    document.location = '/dashboard';
  }

  render() {
    const links = [
      { path: "/dashboard", label: "transcriptions" },
      { path: "/dashboard/courses", label: "courses" },
      { path: "/dashboard/problems", label: "problems" },
      { path: "/dashboard/topics", label: "topics" },
      { path: "/dashboard/comments", label: "comments" },
      { path: "/dashboard/interactive", label: "interactive" },
      { label: "logout", onClick: this.logout }
    ];
    const items = map(links, (link, key) => {
      const classname = classnames({
        "admin-link": true,
        "admin-link-active": link.path === document.location.pathname
      });
      return (<a key={key} className={classname} href={link.path} onClick={link.onClick}>{upperCase(link.label)}</a>);
    });
    return (
      <div className="admin-nav">
        {items}
      </div>
    );
  }
}

export default DashboardNav;
