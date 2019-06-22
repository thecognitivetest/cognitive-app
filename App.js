import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from './app/components/Login';
import SignupScreen from './app/components/Signup'

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
    title: 'Home'
  };

  render() {
    return (
      <ThemeProvider>
        <View style={styles.container}>
          <Text style={styles.text}>Welcome</Text>
          <Button 
            title='Start'
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </ThemeProvider>
    );
  }
}

const RootStack = createStackNavigator(
    {
        Home: {
          screen: HomeScreen,
        },
        Login: {
          screen: LoginScreen,
        },
        Signup: {
          screen: SignupScreen,
        },
    },
    {
        initialRouteName: 'Home',
        // defaultNavigationOptions: { header: null }
    }
);

const AppContainer = createAppContainer(RootStack);

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
