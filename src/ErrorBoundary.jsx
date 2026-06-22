import React from "react";
import ErrorFallback from "./ErrorFallback";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorFallback error={error} reset={this.reset} />;
    }

    return children;
  }
}

