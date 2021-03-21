import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Department from './Department';
import Employee from './Employee';
import Navigation from './Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/departments" component={Department} />
          <Route path="/employees" component={Employee} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
