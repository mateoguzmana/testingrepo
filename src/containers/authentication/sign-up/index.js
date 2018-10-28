// @vendors
import React, { Component } from "react";
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { Auth } from "aws-amplify";

// @styling
import styles from './styles';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this._onPress = this._onPress.bind(this);
    }

    _signUp(email, password, success) {
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email
            }
        }).then(res => {
            console.log('[Auth] signed up', res);
            success();
        }).catch(err => {
            console.log('[Auth] signUp err: ', err);
        });
    };

    _onPress(success) {
        const { email, password } = this.state;
        this._signUp(email, password, success);
    }

    render() {
        const { email, password } = this.state;
        return (
            <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
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
                <Button title="Sign Up" onPress={ () => this._onPress(() => this.props.navigation.goBack()) }/>
            </View>
        );
    }
}

export default SignUp;
