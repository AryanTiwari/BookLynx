import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthenticatedComponent from './wrappers/AuthenticatedComponent';
import { auth } from './firebase';
import { Dashboard } from './container/Dashboard';
import ErrorPage from './Pages/ErrorPage';
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage';

class App extends Component {
  state = { user: null }

  _renderDashboard = () => (
    <AuthenticatedComponent 
      user={this.state.user}
      fallback='/'
      needsAuth={true}
      component={<Dashboard/>}
    />
  )

  _renderLogin = () => (
    <AuthenticatedComponent 
      user={this.state.user}
      fallback='/data'
      needsAuth={false} 
      component={<LoginPage/>}
    />
  )

  _renderRegister = () => (
    <AuthenticatedComponent 
      user={this.state.user}
      fallback='/data'
      needsAuth={false} 
      component={<RegisterPage/>}
    />
  )

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ user: user })
    })
  }

  render() {
    return (
      <Router>
        <div>
            <Switch>
              <Route exact path="/" component={this._renderLogin} />
              <Route exact path="/data" component={this._renderDashboard} />
              <Route exact path="/register" component={this._renderRegister} />
              <Route path='*' component={ErrorPage} />
            </Switch>
        </div>
      </Router>      
    );
  }
}

export default App;
