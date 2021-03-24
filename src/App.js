import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Department from './Department';
import Employee from './Employee';
import Navigation from './Navigation';

function App() {
  return (
    <div className="container text-center justify-content-center">
      <h3>ReactJS With ASP.NET Core Web API Demo</h3>
      <h5>Employee Management Portal</h5>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/departments" component={Department} />
        <Route path="/employees" component={Employee} />
      </Switch>
    </div>
  );
}

export default App;
