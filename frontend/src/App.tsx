import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// routes
import Dishes from "routes/Dishes";
import Dashboard from "routes/Dashboard";
import { Routes } from "routes/routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <p>Kochrunde</p>
      </header>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={Routes.dashboard.path}>Dashboard</Link>
            </li>
            <li>
              <Link to={Routes.dishes.path}>Gerichte</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={Routes.dashboard.path} exact children={<Dashboard />} />
          <Route path={Routes.dishes.path} exact children={<Dishes />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
