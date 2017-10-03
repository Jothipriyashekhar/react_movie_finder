import React from 'react';
import {BrowserRouter as Router, Switch, Route, Match} from 'react-router-dom';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Login from './Login.jsx';
import Searchmovie from './Searchmovie.jsx';
import Header from './Header.jsx';

injectTapEventPlugin();
const muiTheme = getMuiTheme(lightBaseTheme, {
	appBar: {
		color: '#37474F'
	},
  raisedButton: {
		primaryColor: '#546E7A'
	},
	})
ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router >
    <div>
			<Switch>
      <Route exact path='/' component={Header}/>
    </Switch>
           </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root'))
