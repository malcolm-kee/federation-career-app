import * as React from 'react';
import ReactDOM from 'react-dom';

const Career = React.lazy(() => import('./career'));

const App = () => (
  <React.Suspense fallback="Loading...">
    <Career />
  </React.Suspense>
);
ReactDOM.render(<App />, document.getElementById('app'));
