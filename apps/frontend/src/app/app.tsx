import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Admin from './views/Admin';
import Login from './views/Login';
import Public from './views/Public';

function App() {
  return (
    <Router>
      <Route key="public" path="/" exact component={Public} />
      <Route key="login" path="/login" exact component={Login} />
      <Route key="admin" path="/admin" exact component={Admin} />
    </Router>
  );
}

export default App;
