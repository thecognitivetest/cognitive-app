import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './app/components/Login';
import RegisterScreen from './app/components/Register';
import HomeScreen from './app/components/Home';
import CognitiveHomeScreen from './app/components/cognitive/CognitiveHome';
import firebase from 'firebase'
import '@firebase/firestore';

class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Welcome'
  };

  start() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.props.navigation.navigate('Home')
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    return (
      <ThemeProvider>
        <View style={styles.container}>
          <Text style={styles.text}>Welcome</Text>
          <Button 
            title='Start'
            onPress={() => this.start()}
          />
        </View>
      </ThemeProvider>
    );
  }
}

// TODO: add loading screen https://reactnavigation.org/docs/en/auth-flow.html

const AppStack = createStackNavigator(
    {
        Welcome: WelcomeScreen,
        Home: HomeScreen,
        CognitiveHome: CognitiveHomeScreen,
    }
);

const AuthStack = createStackNavigator(
  {
      Login: LoginScreen,
      Register: RegisterScreen,
  }
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
}
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    paddingBottom: 20,
  },
});

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
