import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service like Sentry or log to the console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Something went wrong. 😢</h2>
          <p>Try refreshing the page or contact support.</p>
          {this.state.error && (
            <pre style={{ color: "red", textAlign: "left", overflow: "auto" }}>
              {this.state.error.toString()}
            </pre>
          )}
          {this.state.errorInfo && (
            <div style={{ color: "gray", fontSize: "12px" }}>
              <p>{this.state.errorInfo.componentStack}</p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
