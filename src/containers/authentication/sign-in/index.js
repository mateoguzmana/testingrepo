// @vendors
import React, { Component } from "react";
import { Alert, Button, Platform, TextInput, View } from 'react-native';
import { Auth } from "aws-amplify";
// @storage
import LocalStorage from "../../../config/storage";
import Monitor from "../../../components/monitor/index"
// @styling
import styles from './styles';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.successRoute = this.props.successRoute;
        this._onPress = this._onPress.bind(this);
        this._navigateToSuccessRoute = this._navigateToSuccessRoute.bind(this);
    }

    _signIn(email, password, success, failure) {
        console.log('[Auth] signing in with ' + email + ' / ' + password);
        Auth.signIn(email, password)
            .then(user => {
                console.log('[Auth] calling LocalStorage.setUser');
                LocalStorage.setUser(user)
                    .then(value => {
                        console.log("value: " + value);
                        console.log('[Auth] calling startLocationMonitor');
                        try {
                            // request geolocation authorization only if the user has not allow it yet.
                            Platform.OS === "ios" ?
                                () => {
                                    navigator.geolocation.requestAuthorization();
                                }
                                : null;
                        } catch (error) {
                            console.log("[Auth] error: " + error);
                        }
                        Monitor.start();
                        console.log("[Auth] calling success");
                        success();
                        console.log("[Auth] called success");
                    });
            })
            .catch(err => {
                console.log('[Auth] signIn err: ', err);
                if (err.code && err.code === 'UserNotFoundException') {
                    console.log('[Auth] err: ', err);
                    failure(err.message);
                } else if (!err.code) {
                    console.log("[Auth] calling success");
                    success();
                    console.log("[Auth] called success");
                }
            });
    };

    _onPress(success, failure) {
        const { email, password } = this.state;
        console.log("[Auth] Break here");
        this._signIn(email, password, success, failure);
    }

    _navigateToSuccessRoute() {
        console.log('[Auth] navigating to: ' + this.successRoute);
        this.props.navigation.navigate(this.successRoute);
    }

    render() {
        const { email, password } = this.state;
        return (
            <View style={ { alignItems: 'center', width: '100%' } }>
                <TextInput
                    style={ styles.input }
                    value={ email }
                    placeholder='E-Mail'
                    keyboardType={ 'email-address' }
                    autoCorrect={ false }
                    onChangeText={ (value) => this.setState({ email: value }) }/>
                <TextInput
                    style={ styles.input }
                    value={ password }
                    placeholder='Password'
                    secureTextEntry={ true }
                    autoCorrect={ false }
                    onChangeText={ (value) => this.setState({ password: value }) }/>
                <Button title="Sign In"
                        onPress={ () => {
                            console.log("[Auth] onPress");
                            this._onPress(
                                () => this._navigateToSuccessRoute(),
                                () => Alert.alert(
                                    'Error', 'Error',
                                    [
                                        { text: 'OK' }
                                    ]))
                        } }/>
            </View>
        );
    }
}

export default SignIn;
