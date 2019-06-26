import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './app/screens/Login';
import RegisterScreen from './app/screens/Register';
import HomeScreen from './app/screens/Home';
import CognitiveHomeScreen from './app/screens/cognitive/CognitiveHome';
import firebase from 'firebase'
import '@firebase/firestore';

class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {authenticated: false}
  }

  static navigationOptions = {
    title: 'Welcome'
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authenticated: true});
      } else {
        this.setState({authenticated: false});
      }
    });
  }

  render() {
    if(this.state.authenticated) {
      return (<HomeScreen/>)
    }
    else {
      return (
        <ThemeProvider>
          <View style={{alignItems: 'center', paddingTop: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Your health.</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'pink'}}>In your hands.</Text>
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
              type='clear'
            />
          </View>
        </ThemeProvider>
      );
    }
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
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
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

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
