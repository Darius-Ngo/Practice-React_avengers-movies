import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProviderMovies } from './components/hooks/context';

ReactDOM.render(
  <React.StrictMode>
    <ProviderMovies>
      <App />
    </ProviderMovies>
  </React.StrictMode>,
  document.getElementById('root')
);

