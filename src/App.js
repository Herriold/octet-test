import Router from './route/index';
import { AuthProvider } from './contexts/AuthProvider';
import { HashRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <AuthProvider>
        <HashRouter>
          <Router>
            {(content) => content}
          </Router>
        </HashRouter>
      </AuthProvider>
  );
}

export default App;
