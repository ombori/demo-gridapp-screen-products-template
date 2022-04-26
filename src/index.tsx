import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Init from './init';
import ErrorBoundary from './error-boundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Init />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
