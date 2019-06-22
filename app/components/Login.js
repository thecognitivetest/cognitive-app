import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Picker, TextInput } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import firebase from 'firebase'
import '@firebase/firestore';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: 'email',
            password: 'password',
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
            title: 'Login',
            headerStyle: {
                backgroundColor: '#fff',
            },
        }
    };

    logIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                console.log(firebaseUser);
                this.props.navigation.navigate('Home');
            }
        });
    }

    render() {
        return (
            <ThemeProvider>
                <ScrollView style={{paddingTop: 40, padding: 10}}>
                    <View style={styles.container}>
                        <Text style={{fontSize: 20}}>Email:</Text>
                        <TextInput 
                            style={styles.textInput}
                            value={this.state.email} 
                            onChangeText={(email) => this.setState({email})}
                        />  
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontSize: 20}}>Password:</Text>
                        <TextInput 
                            style={styles.textInput}
                            value={this.state.password} 
                            onChangeText={(password) => this.setState({password})}
                        />  
                    </View>
                    <Button 
                        onPress={() => this.logIn()}
                        title='Log In'
                    />
                    <Button 
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
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
    textInput: {
        width: 100,
        fontSize: 20,
    },
    picker: {
        width: 120,
    },
});