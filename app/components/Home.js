import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
            title: 'Home',
            headerStyle: {
                backgroundColor: '#fff',
            },
        }
    };

    render() {
        return (
            <ThemeProvider>
                <ScrollView style={{paddingTop: 40, padding: 10}}>
                    <Button 
                        onPress={() => this.props.navigation.navigate('CognitiveHome')}
                        title='Cognitive Test'
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