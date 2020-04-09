import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import PuppyListPage from '../PuppyListPage/PuppyListPage';
import AddPuppyPage from '../AddPuppyPage/AddPuppyPage';
import EditPuppyPage from '../EditPuppyPage/EditPuppyPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import * as puppyAPI from '../../utils/puppiesService';
import userService from '../../utils/userService';

class App extends Component {
  state = {
    puppies: [],
    user: userService.getUser()
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleAddPuppy = async newPupData => {
    const createNewPupAndGetAllPuppies = await puppyAPI.create(newPupData);
    this.setState(state => ({
      puppies: createNewPupAndGetAllPuppies
    }), () => {
      this.props.history.push('/')
    });
  }

  handleDeletePuppy= async id => {
    await puppyAPI.deleteOne(id);
    this.setState(state => ({
      puppies: state.puppies.filter(p => p._id !== id)
    }), () => this.props.history.push('/'));
  }

  handleUpdatePuppy = async updatedPupData => {
    const updatedPuppyAndGetAllPuppies = await puppyAPI.update(updatedPupData);
    this.setState({
      puppies: updatedPuppyAndGetAllPuppies
    },
      // Using cb to wait for state to update before rerouting
      () => this.props.history.push('/')
    );
  }

  async componentDidMount() {
    const puppies = await puppyAPI.getAll();
    this.setState({puppies});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          React Puppies CRUD
          <nav>
            {userService.getUser() ?
              <>
                HI, {userService.getUser().name.toUpperCase()}
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/' onClick={this.handleLogout}>LOGOUT</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/'>PUPPIES LIST</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/add'>ADD PUPPY</NavLink>
              </>
              :
              <>
                <NavLink exact to='/signup'>SIGNUP</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/login'>LOGIN</NavLink>
                &nbsp;&nbsp;&nbsp;
              </>
            }
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/signup' render={({ history }) => <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} /> }/>
            <Route exact path='/login' render={({ history }) => <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} /> }/>
            <Route exact path='/' render={({ history }) =>
              userService.getUser() ?
              <PuppyListPage puppies={this.state.puppies} handleDeletePuppy={this.handleDeletePuppy} /> :
              <Redirect to='/login'/>
            } />
            <Route exact path='/add' render={() =>
              userService.getUser() ?
              <AddPuppyPage handleAddPuppy={this.handleAddPuppy} /> :
              <Redirect to='/login'/>
            } />
            <Route exact path='/edit' render={({ history, location }) =>
              userService.getUser() ?
              <EditPuppyPage handleUpdatePuppy={this.handleUpdatePuppy} location={location} /> :
              <Redirect to='/login'/>
            } />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;