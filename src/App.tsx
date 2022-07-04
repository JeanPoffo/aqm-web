import Router from './routes/routes';

import { AuthProvider } from './hook/auth';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
