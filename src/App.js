import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = { // reserved for Component based classes
    persons: [
      { name: 'Kevin', age: 24 },
      { name: 'Percy', age: 23 },
      { name: 'Kaissa', age: 21 }
    ],
    otherState: 'this is other value'
  }
  
  switchNameHandler = (newName) => {
    // console.log('Was Clicked!');
    // dont do this this.state.persons[0].name = 'KEVINCITO';
    this.setState({ persons: [
        { name: newName, age: 24 },
        { name: 'Percy', age: 23 },
        { name: 'Kaissa', age: 24 }
      ]
    })
  }

  nameChangedHangler = (event) => {
    this.setState({ persons: [
        { name: 'Kevin', age: 24 },
        { name: event.target.value, age: 23 },
        { name: 'Kaissa', age: 24 }
      ]
    })
  }

  render(){
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={() => this.switchNameHandler('Kevincito')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Kevo')}
          changed={this.nameChangedHangler}>
            My hobbie cycling
        </Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    ); 
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));  
  }
}

export default App;
