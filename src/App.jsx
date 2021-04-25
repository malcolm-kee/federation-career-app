import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const Career = React.lazy(() => import('./career'));

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <React.Suspense fallback="Loading...">
      <QueryClientProvider client={queryClient}>
        <Career />
      </QueryClientProvider>
    </React.Suspense>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById('app'));
