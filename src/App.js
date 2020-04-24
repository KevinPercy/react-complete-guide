import React, {Component} from 'react';
import classes from './App.css';

import Person from './Person/Person';


class App extends Component {
  state = { // reserved for Component based classes
    persons: [
      { id: '1', name: 'Kevin', age: 24 },
      { id: '2', name: 'Percy', age: 23 },
      { id: '3', name: 'Kaissa', age: 21 }
    ],
    otherState: 'this is other value',
    showPersons: false
  }
  
  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
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
    this.setState({showPersons: !doesShow})
  }

  render(){
    let persons = null;
    let btnClass = null;
    if (this.state.showPersons){
      persons = (
        <div>
            {this.state.persons.map((person, index) => {
              return <Person 
                        click={() => this.deletePersonHandler(index)}
                        name={person.name} 
                        age={person.age} 
                        key={person.id} 
                        changed={(event) => this.nameChangedHandler(event, person.id)}
                     />
            })}            
        </div>
      );
      
      btnClass = classes.Red;
    }

    let assignedClasses = [];
    if (this.state.persons.length <=2) {
      assignedClasses.push( classes.red );
    }
    if (this.state.persons.length <=1) {
      assignedClasses.push( classes.bold );
    }

    return (      
        <div className={classes.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button  
            className={btnClass}         
            onClick={this.togglePersonsHandler}>Toogle Persons</button>
          {persons}              
        </div>
    ); 
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));  
  }
}

export default App;
