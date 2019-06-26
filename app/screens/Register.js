import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Picker, Alert } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import firebase from 'firebase'
import '@firebase/firestore';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            firstName: '',
            lastName: '',
            age: '',
            gender: 'male',
            race: 'white',
            email: '',
            emailError: '',
            password: '',
            passwordHidden: true,
            passwordError: '',
            passwordConfirm: '',
            passwordConfirmError: '',
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Register',
            headerStyle: {
                backgroundColor: '#fff',
            },
        }
    };

    signUp = async() => {
        if(this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.age.length > 0 && this.state.password == this.state.passwordConfirm) {
            await auth.createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                if(errorCode == 'auth/invalid-email') {
                    this.setState({emailError: 'Invalid Email'});
                } else if(errorCode == 'auth/email-already-in-use') {
                    this.setState({emailError: 'Email is already in use'});
                } else {
                    this.setState({emailError: ''});
                }

                if(errorCode == 'auth/weak-password') {
                    this.setState({passwordError: 'Password must be at least 6 characters'});
                } else {
                    this.setState({passwordError: ''});                
                }
            });
        } else if(this.state.password != this.state.passwordConfirm) {
            this.setState({passwordConfirmError: 'Passwords must match'});
        } else {
            Alert.alert('Please fill out all fields!')
        }

        auth.onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                db.collection("users").doc(firebaseUser.uid).set({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    age: this.state.age,
                    race: this.state.race,
                    gender: this.state.gender,
                    email: this.state.email,
                    id: firebaseUser.uid,
                })
                this.props.navigation.navigate('Home');
            }
        });
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
                        textContentType='newPassword'
                        error={this.state.passwordError}
                    />
                    <TextField
                        value={this.state.passwordConfirm} 
                        secureTextEntry={this.state.passwordHidden}
                        onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
                        label='Confirm Password'
                        textContentType='newPassword'
                        error={this.state.passwordConfirmError}
                    />
                    <TextField
                        value={this.state.firstName} 
                        onChangeText={(firstName) => this.setState({firstName})}
                        label='First Name'
                        textContentType='givenName'
                    />
                    <TextField
                        value={this.state.lastName} 
                        onChangeText={(lastName) => this.setState({lastName})}
                        label='Last Name'
                        textContentType='familyName'
                    />
                    <TextField
                        value={this.state.age} 
                        onChangeText={(age) => this.setState({age})}
                        label='Age'
                        keyboardType='numeric'
                    />
                    <View style={styles.container}>
                        <Text style={{fontSize: 20}}>What is your gender?</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.gender}
                            mode={'dialog'}
                            onValueChange={(newValue) => this.setState({gender: newValue})}>
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Non Binary" value={null} />
                        </Picker>
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontSize: 20}}>What is your race?</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.race}
                            mode={'dialog'}
                            onValueChange={(newValue) => this.setState({race: newValue})}>
                            <Picker.Item label="White" value="white" />
                            <Picker.Item label="Black" value="black" />
                            <Picker.Item label="Asian" value="asian" />
                            <Picker.Item label="Prefer not to Say" value={null} />
                        </Picker>
                    </View>
                    <Button 
                        onPress={() => this.signUp()}
                        title='Signup'
                    />
                </ScrollView>
            </ThemeProvider>
        );
    }
}

const db = firebase.firestore();
const auth = firebase.auth();

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