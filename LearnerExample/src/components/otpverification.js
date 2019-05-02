import React from 'react';
import { View, Text, TouchableOpacity , TextInput, Image, ActivityIndicator, SafeAreaView, Alert, TouchableWithoutFeedback} from 'react-native';
var dismissKeyboard = require('dismissKeyboard');


class OtpVerification extends React.Component{
  state = {
    otp:'',
    mobileNumber:'',
    emailId:'',
    password:'',
    otpError: false,
    message: '',
    spinnermessage: ''
  }




  errorMessageCall() {
      if (this.state.otpError) {
        return (
          <Text style={{ color: '#f1948a', alignSelf: 'center' }}>
          {this.state.message}
          </Text>
        )
      }
    }



  displayError() {
        this.setState({ spinnerVisibility: false });
        Alert.alert(
          'Error',
          'Sorry, something went wrong: Please try again later...',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }

  spinnerComponent() {
    if (this.state.spinnerVisible) {
      return (
        <View style={{ flex: 1, backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flexDirection: 'row', overflow: 'hidden', borderRadius: 16,backgroundColor: "grey" }}>
            <ActivityIndicator color='#ffffff' style={{ padding: 4 }} visibility={true} animating={this.state.spinnerVisible} />
                 <Text style={{ fontSize: 16, color: '#FFFFFF', padding: 4, marginRight: 4 }}>{this.state.spinnermessage}</Text>
        </View>
        </View>
      )
    }
  }

  submitotp(){

    dismissKeyboard()
    this.setState({ spinnerVisible: true, otpError: false, message: '', spinnermessage: 'Verifying otp, please wait...' })
    var data = new FormData()
      data.append('otp', this.state.otp)
      data.append('mobileNumber', this.props.navigation.state.params.mobilenumber)
      data.append('deviceType', 'android')
      data.append('deviceToken', 'swdsssss22sf')

      fetch("http://testingmadesimple.org/playard/api/service/verifyotp", {
            method: 'post',
            body: data
          })
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({ spinnerVisible: false })
          if (responseData.status == '1') {
            Alert.alert(
              'Success',
              'Registration Successfull',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '3'){
            this.setState({otpError: true, message: 'Invalid Otp'})
            Alert.alert(
              'Error',
              'Invalid otp...',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '2'){
            Alert.alert(
              'Error',
              'Mobile numer is in correct',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '0'){
            Alert.alert(
              'Error',
              'Sorry, Please fill the otp...',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }

          })
          .catch((error) => {
            this.setState({ spinnerVisible: false })
            this.displayError();
          })
          .done();
  }

  resendotp(){
    dismissKeyboard()
    this.setState({ spinnerVisible: true, otpError: false, message: '', spinnermessage: 'Resending otp, please wait...' })
    var data = new FormData()
      data.append('mobileNumber', this.props.navigation.state.params.mobilenumber)

      fetch("http://testingmadesimple.org/playard/api/service/resendotp", {
            method: 'post',
            body: data
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            this.setState({ spinnerVisible: false })
          if (responseData.status == '1') {
            Alert.alert(
              'Success',
              'Otp sent Successfully',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '3'){
            this.setState({otpError: true, message: 'Invalid Otp'})
            Alert.alert(
              'Error',
              'Failed to send otp...',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '2'){
            Alert.alert(
              'Error',
              'Mobile numer not yet registered',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '0'){
            Alert.alert(
              'Error',
              'Sorry, Please fill the mobile number again...',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }

          })
          .catch((error) => {
            this.setState({ spinnerVisible: false })
            this.displayError();
          })
          .done();
  }


  render(){
    return(
      <View style={{ flex: 1}}>
      <TouchableWithoutFeedback onPress={()=>{dismissKeyboard();}}>
      <SafeAreaView style={{ flex: 1}} accessible={false}>

      <View style={{ flex: 1, marginTop:0, borderWidth: 0}}>
        <View style={{ flex: 1, marginHorizontal:30}}>
            <View style={{ flex: 0.4, borderWidth: 0}}>
              <View style={{ flex: 3, borderWidth: 0, marginTop: 20}}>
                <Text style={{fontWeight: "bold", fontSize: 20, color: "#363f4d"}}>
                  OTP
                </Text>
                <Text style={{fontWeight: "bold", fontSize: 20, marginVertical: 5, color: "#363f4d"}}>
                  VERIFICATION
                </Text>
              </View>
              <View style={{ flex: 1, borderWidth: 0, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
              {this.errorMessageCall()}
              </View>
            </View>
            <View style={{ flex: 1.6, borderWidth: 0}}>
              <View style={{ flex: 1, borderWidth: 0, marginTop: 20}}>
                  <View style={{ flex: 1.2, borderWidth: 0}}>
                    <View style={{ flex: 1.8, borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color:'#999999',fontSize:16}} >Sent a verification code to verify your</Text>
                      <Text style={{color:'#999999',fontSize:16}} >mobile number</Text>
                    </View>
                    <View style={{ flex: 1, borderWidth: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{color:'#999999',fontSize:16}}>send to +91 {this.props.navigation.state.params.mobilenumber}</Text>
                    </View>

                  </View>
                  <View style={{ flex: 1.8, borderWidth: 0}}>
                      <View style={{ flex: 1, borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                        style={{ borderBottomWidth: 1, borderColor: '#33cbf6', width: 110, textAlign: 'center', padding:8, alignItems: 'center', height:40,fontSize:16}}
                          keyboardType={'numeric'}
                          onSubmitEditing={()=>{this.submitotp()}}
                          returnKeyType='done'
                          underlineColorAndroid={'transparent'}
                          maxLength={6}
                          autoFocus={true}
                          selectionColor={'#33cbf6'}
                          autoCorrect={false}
                          value={this.state.otp}
                          onChangeText={(verifyNumber) => this.setState({ otp: verifyNumber.replace(/[^0-9]/g, '') },()=>{if(verifyNumber.length == 6){this.submitotp()}} )}
                        />
                      </View>
                        <View style={{ flex: 1.5, borderWidth: 0}}>
                        <View style={{ flex: 1.5, borderWidth: 0}}>
                        <View style={{ flex: 1, borderWidth: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                  <Text style={{color:'#999999',fontSize:16}}>Didn't get code yet?</Text>
                  <TouchableOpacity onPress={()=>{this.resendotp();}}>
                  <Text style={{color:'#33cbf6',fontSize:16,paddingLeft:10}}>Resend</Text>
                  </TouchableOpacity>
                </View>
                        </View>
                        <View style={{ flex: 1.5, borderWidth: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{color:'#363f4d',fontSize:16,color:'#000000',alignContent:'flex-start'}}>+91 {this.props.navigation.state.params.mobilenumber} not your Number?</Text>

                        </View>
                        </View>
                      <View style={{ flex: 0.5, borderWidth: 0, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row'}}>

                        </View>
                  </View>

              </View>
            </View>
            <View style={{ flex: 0.5, borderWidth: 0}}>
              <View style={{ flex: 0.9, borderWidth: 0}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null);}} style={{ flex: 1.5, borderWidth: 0, backgroundColor: "#33cbf6", borderRadius: 5, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color: "white", fontSize: 20, fontWeight: '500'}}>
                  Enter your mobile number
                </Text>
              </TouchableOpacity>
              </View>
              <View style={{ flex: 1.4, borderWidth: 0}}>
              </View>

            </View>
        </View>


      </View>
        {this.spinnerComponent()}

      </SafeAreaView>
      </TouchableWithoutFeedback>
      </View>


    );
  }
}

export {OtpVerification};
