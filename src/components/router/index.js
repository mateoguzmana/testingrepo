// @vendors
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
// @components
import Routes from './routes';

const StackNavigator = createStackNavigator(Routes);

class _Navigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StackNavigator ref={ component => component }/>
        );
    }
}

export const Navigator = () => <_Navigator/>;
