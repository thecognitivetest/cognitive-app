import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './app/screens/AuthLoading';
import LoginScreen from './app/screens/Login';
import RegisterScreen from './app/screens/Register';
import HomeScreen from './app/screens/Home';
import CognitiveHomeScreen from './app/screens/cognitive/CognitiveHome';

class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {authenticated: false}
  }

  static navigationOptions = {
    title: 'Welcome'
  };

  render() {
    return (
      <ThemeProvider>
        <View style={{alignItems: 'center', paddingTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Your health.</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ffc0cb'}}>In your hands.</Text>
        </View>
        <View style={styles.container}>
          <Button 
            title='Login'
            onPress={() => this.props.navigation.navigate('Login')}
            buttonStyle={{backgroundColor: '#ffc0cb'}}
          />
          <Button 
            title='Signup'
            onPress={() => this.props.navigation.navigate('Register')}
            buttonStyle={{backgroundColor: '#dddddd'}}
          />
          <Button 
            title='Terms of Service'
            // make a modal open with the TOS
            type='clear'
          />
        </View>
      </ThemeProvider>
    );
  }
}

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        CognitiveHome: CognitiveHomeScreen,
    }
);

const AuthStack = createStackNavigator(
  {
      Welcome: WelcomeScreen,
      Login: LoginScreen,
      Register: RegisterScreen,
  }
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
});

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
