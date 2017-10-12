import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider, lightBaseTheme} from "material-ui/styles";

//colors
//import { grey500 as primary1Color } from 'material-ui/styles/colors';

import Root from './containers/root/Root';
import reducer from './reducers';

const history = createHistory()

const middleware = applyMiddleware(thunk, routerMiddleware(history), createLogger());
const store = createStore(reducer, middleware);

const lightMuiTheme = getMuiTheme(lightBaseTheme, {
  /*palette: {
    primary1Color
  }*/
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={lightMuiTheme}>
    <Provider store={store}>
      <Root history={history}/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
