import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import firebase from 'firebase'
import '@firebase/firestore';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Home',
            headerStyle: {
                backgroundColor: '#fff',
            },
        }
    };

    signOut() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
            Alert.alert("Having trouble signing out" + error);
        });

        firebase.auth().onAuthStateChanged(firebaseUser => {
            this.props.navigation.navigate('Welcome');
        });
          
    }

    render() {
        return (
            <ThemeProvider>
                <ScrollView style={{paddingTop: 40, padding: 10}}>
                    <Button 
                        onPress={() => this.props.navigation.navigate('CognitiveHome')}
                        title='Cognitive Test'
                    />
                    <Button 
                        onPress={() => this.signOut()}
                        title='Sign Out'
                    />
                </ScrollView>
            </ThemeProvider>
        );
    }
}

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