import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Fib from './Fib';
import otherpage from './otherpage';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other page</Link>
          <p>Kubernetes</p>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route exact path="/otherpage" component={otherpage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
