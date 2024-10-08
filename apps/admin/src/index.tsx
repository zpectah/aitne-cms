import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
