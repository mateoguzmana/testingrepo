import React from 'react';
import Home from '../../containers/home';
import UserStorylines from '../../containers/user-storylines';
import SignUp from "../../containers/authentication/sign-up";

const Routes = {
     Home: {
        screen: (props) => <Home { ...props }/>,
        navigationOptions: () => ({
            title: 'Home',
            header: null
        })
    },
     SignUp: {
        screen: (props) => <SignUp { ...props }/>,
        navigationOptions: () => ({
            title: 'Sign Up'
        })
    },
    UserStorylines: {
        screen: (props) => <UserStorylines { ...props }/>,
        navigationOptions: () => ({
            title: 'User Storylines',
            headerRight: null,
            headerStyle: {
                backgroundColor: '#42a1f4',
            },
            headerTitleStyle: {
                color: '#ffffff'
            },
            headerTintColor: '#ffffff',
            headerLeft: null
        })
    }
};

export default Routes;
