import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

//Home Page Component
import MainPage from './components/home/MainPage/MainPage';

//SignUp and Login Component
import SignUp from './components/auth/SignUp/SignUp';

// Projects Components
import Projects from './components/dashboard/ProjectDashboard/ProjectDashboard';
import ProjectDetails from './components/dashboard/ProjectDashboard/ProjectDetails/ProjectDetails';
import AddProject from './components/dashboard/ProjectDashboard/ProjectAddForm/ProjectAddForm';

// Developers Component
import Dev from './components/dashboard/DevDashboard/DevDashboard';

// Enterprise Component
import Ent from './components/dashboard/EntDashboard/EntDashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch >
        <Route exact path='/' component={MainPage} />
        <Route path='/projects' component={Projects} />
        <Route path='/add' component={AddProject} />
        {/* <Route path='/projects/:id' component={ProjectDetails} /> */}
        <Route path='/signup' component={SignUp} />
        <Route path='/dev' component={Dev} />
        <Route path='/ent' component={Ent} />
      </Switch>
      </div>
    );
  }
}

export default App;
