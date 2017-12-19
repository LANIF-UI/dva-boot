import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import {createRoutes} from '../utils/core';

@connect()
export default class UserLayout extends React.PureComponent {
  render() {
    const {routerData, match, location, dispatch} = this.props;
    const {title, childRoutes} = routerData;

    return (
      <DocumentTitle title={title}>
        <Switch>
          {childRoutes}
        </Switch>
      </DocumentTitle>
    );
  }
}