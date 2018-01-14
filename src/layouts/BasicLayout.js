import React from 'react';
import { connect } from 'dva';
import { Switch, NavLink, routerRedux } from 'dva/router';
import './styles/basic.less';

@connect()
export default class BasicLayout extends React.PureComponent {
  componentDidMount() {
    if (!localStorage.getItem('user')) {
      this.props.dispatch(routerRedux.replace('/user/login'))
    }
  }

  render() {
    const { routerData } = this.props;
    const { childRoutes } = routerData;

    return (
      <div className="basic-layout">
        <nav>
          <NavLink to="/home" activeClassName="active">Home</NavLink>
          <NavLink to="/userInfo" activeClassName="active">UserInfo</NavLink>
          <NavLink to="/user" activeClassName="active">Logout</NavLink>
        </nav>
        <Switch>
          {childRoutes}
        </Switch>
      </div>
    );
  }
}