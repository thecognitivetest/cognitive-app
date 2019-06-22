import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Picker, TextInput } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import firebase from 'firebase'
import '@firebase/firestore';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: 'Benjamin Franklin',
            age: '65',
            gender: 'Male',
            race: 'White',
            email: 'email',
            password: 'password',
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
            title: 'Signup',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerRight: (
            <Button
                onPress={() => navigation.navigate('Test')}
                title="Next"
            />
            ),
        }
    };

    signUp() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        db.collection("users").add({
            name: this.state.name,
            age: this.state.age,
            race: this.state.race,
            gender: this.state.gender,
            email: this.state.email,
        })

        this.props.navigation.navigate('Test');
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
                    <View style={styles.container}>
                        <Text style={{fontSize: 20}}>What is your name?</Text>
                        <TextInput 
                            style={styles.textInput}
                            value={this.state.name} 
                            onChangeText={(name) => this.setState({name})}
                        />  
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontSize: 20}}>What is your age?</Text>
                        <TextInput 
                            style={styles.textInput}
                            value={this.state.age} 
                            onChangeText={(age) => this.setState({age})}
                            keyboardType={'number-pad'}
                        />  
                    </View>
                    <View style={styles.container}>
                    <Text style={{fontSize: 20}}>What is your gender?</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.gender}
                            mode={'dialog'}
                            onValueChange={(newValue) => this.setState({gender: newValue})}>
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Non Binary" value="none" />
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
                        </Picker>
                    </View>
                    <Button 
                        onPress={() => this.signUp()}
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
// firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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