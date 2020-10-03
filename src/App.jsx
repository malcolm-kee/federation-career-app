import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const Career = React.lazy(() => import('./career'));

const App = () => (
  <BrowserRouter>
    <React.Suspense fallback="Loading...">
      <Career />
    </React.Suspense>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById('app'));
