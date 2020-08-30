import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { InsurableContents } from './components/InsurableContents';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={InsurableContents} />
      </Layout>
    );
  }
}
