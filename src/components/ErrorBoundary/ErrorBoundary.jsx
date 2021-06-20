  // eslint-disable-next-line
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(){
      super()
      this.state = {
    hasError: false,
  };
}

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{ color: 'red' }}>Something went wrong</h1>;
    }
    return this.props.children;
  }
}