import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import firebase from 'firebase';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            emailError: '',
            password: '',
            passwordHidden: true,
            passwordError: '',
        }
    }

    static navigationOptions = {
        title: 'Login'
    };

    logIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch((error) => {
            var errorCode = error.code;

            if(errorCode == 'auth/invalid-email' || errorCode == 'auth/user-not-found') {
                this.setState({emailError: 'Invalid Email'});
            } else {
                this.setState({emailError: ''})
            }
            
            if(errorCode == 'auth/wrong-password') {
                this.setState({passwordError: 'Incorrect Password'});
            } else {
                this.setState({passwordError: ''})
            }
        });
    }

    togglePassword() {
        if(this.state.passwordHidden) {
            this.setState({passwordHidden: false});
        } else {
            this.setState({passwordHidden: true});
        }
    }

    render() {
        return (
            <ThemeProvider>
                <ScrollView style={{paddingTop: 40, padding: 10}}>
                    <TextField
                        value={this.state.email} 
                        onChangeText={(email) => this.setState({email})}
                        label='Email'
                        textContentType='emailAddress'
                        error={this.state.emailError}
                    />
                    <TextField
                        value={this.state.password} 
                        secureTextEntry={this.state.passwordHidden}
                        onChangeText={(password) => this.setState({password})}
                        label='Password'
                        textContentType='password'
                        error={this.state.passwordError}
                    />
                    <Button 
                        onPress={() => this.togglePassword()}
                        title='Toggle Password'
                    />
                    <Button 
                        onPress={() => this.logIn()}
                        title='Login'
                    />
                    <Button 
                        title='Forgot your password?'
                        // make a modal appear with the process
                        type='clear'
                    />
                </ScrollView>
            </ThemeProvider>
        );
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyBchPIaXkSX2n6We4Dsp5rVkjTB5FKJiQo",
    authDomain: "cognitive-f72bb.firebaseapp.com",
    databaseURL: "https://cognitive-f72bb.firebaseio.com",
    projectId: "cognitive-f72bb",
    storageBucket: "cognitive-f72bb.appspot.com",
    messagingSenderId: "940470277749",
    appId: "1:940470277749:web:43c1f58aab5c16d3"
};
firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
});