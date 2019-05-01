import React from 'react';
import { View, Text,TouchableOpacity,TextInput } from 'react-native';
import {Signup} from './'

class OtpVerification extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        verifyNumber:''
    }
}
verifyUser(){

}
render(){
  return(
    <View style={{flex:1,marginHorizontal:30,marginTop:20}}>
      <View style={{flex:1}}>
        <Text style={{color:'#363f4d',fontWeight:'bold',fontSize:30}}>OTP</Text>
        <Text style={{color:'#363f4d',fontWeight:'bold',fontSize:30}}>VERIFICATION</Text>
      </View>
      <View style={{justifyContent:'center',flex:1,alignContent:'flex-start'}}>
        <View style={{alignItems:'flex-start'}}>
          <Text style={{color:'#999999',fontSize:20}} >Sent a verification code to verify your</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={{color:'#999999',fontSize:20,alignItems:'center'}}>mobile number</Text>
        </View>
      </View>
      <View style={{justifyContent:'center',alignContent:'flex-start',alignItems:'center'}}>
        <Text style={{color:'#999999',fontSize:20,}}>sent to +91 {this.props.navigation.state.params.mobilenumber}</Text>
      </View>
      <View style={{flex:2}}>
      <View style={{alignItems: 'center',flex:1}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}></View>
          <TextInput
          style={{ borderBottomWidth: 1, borderColor: '#33cbf6', width: 25, textAlign: 'center', padding:8,  alignItems: 'center', height:40, flexWrap: 'wrap',fontSize:18}}
            keyboardType={'numeric'}
            returnKeyType='done'
            underlineColorAndroid={'transparent'}
            maxLength={1}
            autoFocus={true}
            selectionColor={'#33cbf6'}
            onSubmitEditing={this.verifyUser.bind(this)}
            autoCorrect={false}
            value={this.state.verifyNumber}
            onChangeText={(verifyNumber) => this.setState({ verifyNumber: verifyNumber.replace(/[^0-9]/g, ''), })}
          />
          <View style={{flex:0.1}}></View>
          <TextInput
          style={{ borderBottomWidth: 1, borderColor: '#33cbf6', width: 25, textAlign: 'center', padding:8,  alignItems: 'center', height:40, flexWrap: 'wrap',fontSize:18}}
            keyboardType={'numeric'}
            returnKeyType='done'
            underlineColorAndroid={'transparent'}
            maxLength={1}
            autoFocus={true}
            selectionColor={'#33cbf6'}
            onSubmitEditing={this.verifyUser.bind(this)}
            autoCorrect={false}
            value={this.state.verifyNumber}
            onChangeText={(verifyNumber) => this.setState({ verifyNumber: verifyNumber.replace(/[^0-9]/g, ''), })}
          />
          <View style={{flex:0.1}}></View>
          <TextInput
          style={{ borderBottomWidth: 1, borderColor: '#33cbf6', width: 25, textAlign: 'center', padding:8,  alignItems: 'center', height:40, flexWrap: 'wrap',fontSize:18}}
            keyboardType={'numeric'}
            returnKeyType='done'
            underlineColorAndroid={'transparent'}
            maxLength={1}
            autoFocus={true}
            selectionColor={'#33cbf6'}
            onSubmitEditing={this.verifyUser.bind(this)}
            autoCorrect={false}
            value={this.state.verifyNumber}
            onChangeText={(verifyNumber) => this.setState({ verifyNumber: verifyNumber.replace(/[^0-9]/g, ''), })}
          />
          <View style={{flex:0.1}}></View>
          <TextInput
          style={{ borderBottomWidth: 1, borderColor: '#33cbf6', width: 25, textAlign: 'center', padding:8,  alignItems: 'center', height:40, flexWrap: 'wrap',fontSize:18}}
            keyboardType={'numeric'}
            returnKeyType='done'
            underlineColorAndroid={'transparent'}
            maxLength={1}
            autoFocus={true}
            selectionColor={'#33cbf6'}
            onSubmitEditing={this.verifyUser.bind(this)}
            autoCorrect={false}
            value={this.state.verifyNumber}
            onChangeText={(verifyNumber) => this.setState({ verifyNumber: verifyNumber.replace(/[^0-9]/g, ''), })}
          />
          <View style={{flex:0.1}}></View>
          <TextInput
          style={{ borderBottomWidth: 1, borderColor: '#33cbf6', width: 25, textAlign: 'center', padding:8,  alignItems: 'center', height:40, flexWrap: 'wrap',fontSize:18}}
            keyboardType={'numeric'}
            returnKeyType='done'
            underlineColorAndroid={'transparent'}
            maxLength={1}
            autoFocus={true}
            selectionColor={'#33cbf6'}
            onSubmitEditing={this.verifyUser.bind(this)}
            autoCorrect={false}
            value={this.state.verifyNumber}
            onChangeText={(verifyNumber) => this.setState({ verifyNumber: verifyNumber.replace(/[^0-9]/g, ''), })}
          />
          <View style={{flex:0.1}}></View>
          <TextInput
          style={{ borderBottomWidth: 1, borderColor: '#33cbf6', width: 25, textAlign: 'center', padding:8,  alignItems: 'center', height:40, flexWrap: 'wrap',fontSize:18}}
            keyboardType={'numeric'}
            returnKeyType='done'
            underlineColorAndroid={'transparent'}
            maxLength={1}
            autoFocus={true}
            selectionColor={'#33cbf6'}
            onSubmitEditing={this.verifyUser.bind(this)}
            autoCorrect={false}
            value={this.state.verifyNumber}
            onChangeText={(verifyNumber) => this.setState({ verifyNumber: verifyNumber.replace(/[^0-9]/g, ''), })}
          />
          <View style={{flex:1}}></View>
        </View>
        <View style={{flexDirection:'row',flex:1}}>
          <View style={{alignContent:'flex-start',alignItems:'center'}}>
            <Text style={{color:'#999999',fontSize:20}}>Didn't get code yet?</Text>
            <Text style={{color:'#33cbf6',fontSize:20,paddingLeft:10}}>Resend</Text>
          </View>
        </View>
      </View>
      <View style={{flex:1}}>
        <View style={{flex:1,marginTop:20}}>
          <Text style={{color:'#363f4d',fontSize:20,color:'#000000'}}>+91 {this.props.navigation.state.params.mobilenumber} not your Number?</Text>
        </View>
      </View>
      </View>
      <View style={{flex:1}}>
        <TouchableOpacity style={{ height: 50,flex:1,justifyContent:'flex-start'}}>
          <Text style={{ height: 50,borderRadius:20,backgroundColor:'#33cbf6',color:'#FFFFFF',fontSize:23,margin:10}}> Enter your mobile number</Text>
        </TouchableOpacity>
        <View style={{flex:1,borderWidth:1}}>
        </View>
      </View>
    </View>
  )
}
}

export {OtpVerification};
