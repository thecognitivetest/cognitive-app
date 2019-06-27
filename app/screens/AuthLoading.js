import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

export default class CognitiveHome extends Component {

    static navigationOptions = {
        title: 'AuthLoading',
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    }

    render() {
        return (
            <View>

            </View>
        );
    }
}