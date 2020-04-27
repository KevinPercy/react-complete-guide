import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';
//import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor');
    this.state = { // reserved for Component based classes
      persons: [
        { id: '1', name: 'Kevin', age: 24 },
        { id: '2', name: 'Percy', age: 23 },
        { id: '3', name: 'Kaissa', age: 21 }
      ],
      otherState: 'this is other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }

  UNSAFE_componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] inside shouldComponentUpdate()', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //          nextState.showPersons !== this.state.showPersons;
  // }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] inside componentWillUpdate()', nextProps, nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE App.js] inside getDerivedStateFromProps()', nextProps, prevState);
    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log('[UPDATE App.js] inside getSnapshotBeforeUpdate()');
  }
  componentDidUpdate() {
    console.log('[UPDATE App.js] inside componentDidUpdate()')
  }
  // state = { // reserved for Component based classes
  //   persons: [
  //     { id: '1', name: 'Kevin', age: 24 },
  //     { id: '2', name: 'Percy', age: 23 },
  //     { id: '3', name: 'Kaissa', age: 21 }
  //   ],
  //   otherState: 'this is other value',
  //   showPersons: false
  // }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    console.log('[App.js] Inside render()');
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}

          />
        </div>
      );


    }

    return (
      <Aux>
        <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler}
        />
        <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
      </Aux>


    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));  
  }
}

export default withClass(App, classes.App);
