import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import {Signup} from './'

class OtpVerification extends React.Component{
  render(){
    return(
      <View>
      <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Signup');
          }}>
      <Text>OtpVerification</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

export {OtpVerification};
