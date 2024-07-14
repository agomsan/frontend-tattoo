import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import your pages and components here
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

const App = () => {
  return (
    <Router>
      <HeaderComponent />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
      <FooterComponent />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));