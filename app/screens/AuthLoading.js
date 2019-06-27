import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
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
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});