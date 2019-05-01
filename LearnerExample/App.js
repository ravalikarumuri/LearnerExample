/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Signup,OtpVerification} from './src/components';

const AppNavigator = createStackNavigator({
  Signup: { screen: Signup, navigationOptions: { header: null }},
  OtpVerification: { screen: OtpVerification},

},
{
  initialRouteName: 'Signup'
});

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
