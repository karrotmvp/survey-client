import React from 'react';

interface State {
  // IS THIS THE CORRECT TYPE FOR THE state ?
  hasError: boolean;
  errorMessage: string;
}

interface Props {
  // IS THIS THE CORRECT TYPE FOR THE state ?
  children: React.ReactNode;
  fallback: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true, errorMessage: error.message };
  }

  render(): React.ReactNode {
    console.log(this.state.hasError);
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
