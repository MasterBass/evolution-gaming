import React from 'react';
import {Route, Switch} from 'react-router';
import Header from './components/common/Header';
import About from './components/about/AboutPage';
import Home from './components/home/HomePage';
import Login from './components/common/LoginPage';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <div className="App">
              <Header/>
              <Switch>
                  <PrivateRoute exact path="/" component={Home}/>
                  <Route path='/about' component={About}/>
                  <Route path='/login' component={Login}/>
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
