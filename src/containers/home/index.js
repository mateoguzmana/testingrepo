import React, { Component } from "react";
import { Button, Image, Platform, View } from 'react-native';
import Images from '../../../assets/images';
import SignIn from "../../containers/authentication/sign-in";
import { requestAndroidPermissions } from '../../utils/permissions';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    componentDidMount() {
        Platform.OS === "android" ?
            requestAndroidPermissions()
        : null
    } 

    render() {
        return (
            <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
                <Image source={ Images.logo }/>
                <SignIn successRoute={ 'UserStorylines' } navigation={ this.props.navigation }/>
                <Button title="Sign Up" onPress={ () => this.props.navigation.navigate('SignUp') }/>
            </View>
        );
    }
}
