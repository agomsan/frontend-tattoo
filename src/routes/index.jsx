import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Header from '../components/Header';
import Footer from '../components/Footer';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                {/* Add more routes here */}
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;