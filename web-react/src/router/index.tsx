
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import * as React from 'react';
import Routers from './router';


type RouterModel = {
  path: string,
  name: string,
  icon?: string,
  component?: any,
  subRoutes?: Array<RouterModel>
}
const routerList: Array<RouterModel> = Routers
console.log(routerList)

class RouterComponent extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <Switch>
        {
          routerList.map((item: RouterModel, index) => {
            console.log(index)
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
        </Switch>
      </Router>
    )
  }
}

export default RouterComponent;
