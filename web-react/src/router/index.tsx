
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import * as React from 'react';
import Routers from './router';

interface RouterModel {
  path: string,
  name: string,
  icon?: string,
  component?: any,
  subRoutes?: Array<RouterModel>
}

const routerList: Array<RouterModel> = Routers;

export default class RouterComponent extends React.Component {
  render() {
    const href = window.location.href
    return (
      <Router>
        <Switch>
        {
          routerList.map((item: RouterModel, index: number) => {
            return (
              <Route
                path={item.path}
                exact
                component={item.component}
                key={index}
              />
            )
          })
        }
        <Redirect exact to={`/Error/404/url=${encodeURIComponent(href)}`}/>
        </Switch>
      </Router>
    )
  }
}
