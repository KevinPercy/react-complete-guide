import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
    constructor (props) {
        super(props);
        console.log('[Persons.js] Inside Constructor');
        this.lastPersonRef = React.createRef();
    }

    UNSAFE_componentWillMount () {
        console.log('[Persons.js] Inside componentWillMount()');
    }

    componentDidMount () {
        console.log('[Persons.js] Inside componentDidMount()');
        this.lastPersonRef.current.focus();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        console.log('[UPDATE Persons.js] inside componentWillReceiveProps()', nextProps);
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //     console.log('[UPDATE Persons.js] inside shouldComponentUpdate()', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons ||
    //     nextProps.changed !== this.props.changed ||
    //     nextProps.clicked !== this.props.clicked;
    //     //return true;
    // }

    UNSAFE_componentWillUpdate (nextProps, nextState) {
        console.log('[UPDATE Persons.js] inside componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate () {
        console.log('[UPDATE Persons.js] inside componentDidUpdate()')
    }

    render () {
        console.log('[Persons.js] Inside render()');
        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                position={index}
                name={person.name}
                age={person.age}
                ref={this.lastPersonRef}                
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}
            />

        });
    };
}

export default Persons;