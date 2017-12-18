import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import NotFound from '../routes/Exception/404';
import { getRoutes } from '../utils/utils';

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    }
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'dva boot';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${title}`;
    }
    return title;
  }
  render() {
    const {
      currentUser, collapsed, fetchingNotices, notices, routerData, match, location, dispatch,
    } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Switch>
          {
            getRoutes(match.path, routerData).map(path =>
              (
                <Route
                  key={`${match.path}${path}`}
                  path={`${match.path}${path}`}
                  component={routerData[`${match.path}${path}`].component}
                />
              )
            )
          }
          <Redirect exact from="/" to="/dashboard" />
          <Route component={NotFound} />
        </Switch>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  notices: state.global.notices,
}))(BasicLayout);