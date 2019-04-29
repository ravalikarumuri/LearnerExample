import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {OtpVerification} from './'

class Signup extends React.Component{
  render(){
    return(
      <View>
      <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('OtpVerification');
          }}>
      <Text>Hello</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

export {Signup};
