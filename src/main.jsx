import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; 

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            padding: "24px",
            background: "#fff7ed",
            color: "#7c2d12",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "28px", marginBottom: "12px", color: "#7c2d12" }}>
            App failed to render
          </h1>
          <p style={{ marginBottom: "12px" }}>
            A runtime error is stopping the page from loading.
          </p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#ffffff",
              border: "1px solid #fdba74",
              borderRadius: "12px",
              padding: "16px",
              overflow: "auto",
            }}
          >
            {String(this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
