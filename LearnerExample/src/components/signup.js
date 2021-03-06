import React from 'react';
import { View, Text, TouchableOpacity , TextInput, Image, ActivityIndicator, SafeAreaView, Alert, TouchableWithoutFeedback} from 'react-native';
var dismissKeyboard = require('dismissKeyboard');
import {OtpVerification} from './'

class Signup extends React.Component{
  state = {
    name:'',
    mobileNumber:'',
    emailId:'',
    password:'',
    showpwd: true,
    errorMessage: '',
    nameValidation: false,
    emailValidation: false,
    mobileValidation: false,
    passwordValidation: false,
    spinnerVisible: false,
    validInputPassword: false,
    validInputName: false,
    validInputEmail: false,
    validInputMobile: false


  }
  passwordToggle() {
    this.setState({ showpwd: !this.state.showpwd })
  }

  // Toggles password display
  submit() {
    dismissKeyboard()
    if(this.firstNameValid())
    {
      if(this.mobileValid()){
        if(this.emailValid()){
          if(this.passwordValid()){
            this.signup()
          }
        }
      }
    }
  }
  pwdHideAndShow() {
    if (this.state.showpwd == false) {
      return (
        <Image source={require('../assets/images/eyeclose.png')} resizeMode='contain' style={{height:20, width:20, marginBottom: 10}}/>
      )
    } else if (this.state.showpwd == true) {
      return (
        <Image source={require('../assets/images/eyeopen.png')} resizeMode='contain' style={{height:20, width:20, marginBottom: 10}}/>

      )
    }
  }

  validateName = (name) => {
    var name = /^[a-zA-Z\s]+$/.test(name);
    return name;
  };

  firstNameValid() {
      if (!this.validateName(this.state.name)) {
        this.setState({ nameValidation: true,  errorMessage: "Please enter a valid name", validInputName: false });
        return false
      }
      else {
        this.setState({ nameValidation: false, validInputName: true });
        return true
      }
  }

  emailValid() {
    if (!this.validateEmail(this.state.emailId)) {
      this.setState({ emailValidation: true, errorMessage: "Enter your valid Email ID", validInputEmail: false })
      return false
      console.log('Enter your valid Email Address');
    } else {
      this.setState({ emailValidation: false, validInputEmail: true });
      return true
    }
}

mobileValid(){
  if(this.state.mobileNumber.length < 10 ){
    this.setState({ mobileValidation: true, errorMessage: "Enter your valid mobile number", validInputMobile: false})
    return false
  }
  else{
      this.setState({ mobileValidation: false, validInputMobile: true });
      return true
  }
}

passwordValid() {
  if (!this.validatePasswordStrength(this.state.password)) {
    this.setState({ passwordValidation: true , errorMessage:"Password must contain at least 8 characters", validInputPassword: false});
    return false
    console.log("Password must contain at least 8 characters");
  } else {
    this.setState({ passwordValidation: false, validInputPassword: true });
    return true
  }
}

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };



  errorMessageCall() {
      if (this.state.nameValidation || this.state.emailValidation ||  this.state.mobileValidation || this.state.passwordValidation) {
        return (
          <Text style={{ color: '#f1948a', alignSelf: 'center' }}>
            {this.state.errorMessage}
          </Text>
        )
      }
    }


  validatePasswordStrength(password) {

    if(this.state.password.length < 8 ||this.state.mobileNumber==''){
      return false
    }
    else{
      return true
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
                 <Text style={{ fontSize: 16, color: '#FFFFFF', padding: 4, marginRight: 4 }}>Signing up, please wait...</Text>
        </View>
        </View>
      )
    }
  }

  signup(){
    dismissKeyboard()
    this.setState({ spinnerVisible: true })
    var data = new FormData()
      data.append('name', this.state.name)
      data.append('mobileNumber', this.state.mobileNumber)
      data.append('email', this.state.email)
      data.append('password', this.state.password)
      data.append('deviceType', 'android')
      data.append('deviceToken', 'swdsssss22sf')
      data.append('regType', 'direct')
      fetch("http://testingmadesimple.org/playard/api/service/signup", {
            method: 'post',
            body: data
          })
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({ spinnerVisible: false })
          if (responseData.status == '1') {
            this.props.navigation.navigate('OtpVerification',{mobilenumber:this.state.mobileNumber});

          }
          else if(responseData.status == '3'){
            Alert.alert(
              'Error',
              'Sorry, Mobile number already exists, Please try with another...',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '4'){
            Alert.alert(
              'Error',
              'Sorry, Email Id already exists, Please try with another...',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '2'){
            Alert.alert(
              'Error',
              'Sorry, Server is slow, Please try later...',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            )
          }
          else if(responseData.status == '0'){
            Alert.alert(
              'Error',
              'Sorry, Please fill all the fields...',
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
            <View style={{ flex: 1.5, borderWidth: 0}}>
              <View style={{ flex: 1, borderWidth: 0}}>
                <View style={{ flex: 1.5, borderWidth: 0, marginTop: 20}}>
                    <View style={{ flex: 1, flexDirection: 'column', borderWidth: 0, JustifyContent: "center", alignItems: "flex-start", marginTop: 20}}>
                      <Text style={{fontWeight: "bold", fontSize: 20, color: "#363f4d"}}>
                        SIGN UP WITH
                      </Text>
                      <Text style={{fontWeight: "bold", fontSize: 20, marginVertical: 5, color: "#363f4d"}}>
                        YOUR
                      </Text>
                      <Text style={{fontWeight: "bold", fontSize: 20, color: "#363f4d"}}>
                        ACCOUNT
                      </Text>
                    </View>
                </View>

              </View>
              <View style={{ flex: 3, borderWidth: 0, marginTop: 50}}>
              <View style={{ flex:0.4, borderWidth: 0}}>
                {this.errorMessageCall()}
              </View>
                    <View style={{ flex:1, backgroundColor: "white", borderWidth: 0, borderBottomColor: '#D3D3D3', borderBottomWidth: 0.5 }}>
                      <TextInput
                          enablesReturnKeyAutomatically={true}
                          underlineColorAndroid={'transparent'}
                          onEndEditing={this.firstNameValid.bind(this)}
                          returnKeyType='next'
                          onSubmitEditing={()=>{this.mobileNumber.focus();}}
                          blurOnSubmit={false}
                          autoCorrect={false}
                          autoCapitalize={'words'}
                          placeholder="Name"
                          placeholderTextColor="#7f7f7f"
                          style={{ height: 70, flexWrap: 'wrap', color: 'black', fontSize: 20  }}
                          selectionColor={'#33cbf6'}
                          maxLength={35}
                          enablesReturnKeyAutomatically={true}
                          underlineColorAndroid={'transparent'}
                          onChangeText={(name) =>
                            {
                              if(name[0] != ' '){
                                this.setState({name: name })
                              }
                            }
                          }
                          value={this.state.name} />
                    </View>
                    <View style={{ flex:0.1, backgroundColor: "white", borderWidth: 0}}>
                    </View>
                    <View style={{ flex:1, borderWidth: 0, flexDirection: 'row'}}>
                      <View style={{ flex:0.3, backgroundColor: "white", borderWidth: 0, borderBottomColor: '#D3D3D3', borderBottomWidth: 0.5 }}>
                        <View style={{ flex:1, borderWidth: 0, justifyContent: 'flex-end', marginBottom: 10}}>
                          <Text style={{color:"#7f7f7f", fontSize: 18}}>
                            IND +91
                          </Text>
                        </View>
                      </View>
                      <View style={{ flex:0.1}}>
                      </View>
                      <View style={{ flex:1, backgroundColor: "white", borderWidth: 0, borderBottomColor: '#D3D3D3', borderBottomWidth: 0.5 }}>
                        <TextInput
                            autoCorrect={false}
                            maxLength= {10}
                            keyboardType = {'numeric'}
                            ref={(input) => { this.mobileNumber = input; }}
                            placeholder="Mobile Number"
                            placeholderTextColor="#7f7f7f"
                            style={{ height: 70, flexWrap: 'wrap', color: 'black', fontSize: 20  }}
                            selectionColor={'#33cbf6'}
                            returnKeyType='next'
                            enablesReturnKeyAutomatically={true}
                            underlineColorAndroid={'transparent'}
                            onSubmitEditing={()=>{this.emailId.focus();}}
                            onEndEditing={this.mobileValid.bind(this)}
                            onChangeText={(mobileNumber) =>
                              {
                                if(mobileNumber[0] != ' ' && mobileNumber[0] != 0){
                                  this.setState({mobileNumber: mobileNumber.replace(/[^0-9]/g, '') })
                                }
                              }
                            }
                            value={this.state.mobileNumber} />
                      </View>
                    </View>
                    <View style={{ flex:0.1, backgroundColor: "white", borderWidth: 0}}>
                    </View>
                    <View style={{ flex:1, backgroundColor: "white", borderWidth: 0, borderBottomColor: '#D3D3D3', borderBottomWidth: 0.5 }}>
                      <TextInput
                          autoCorrect={false}
                          autoCapitalize={'words'}
                          placeholder="Email Id"
                          placeholderTextColor="#7f7f7f"
                          ref={(input) => { this.emailId = input; }}
                          onEndEditing={this.emailValid.bind(this)}
                          style={{ height: 70, flexWrap: 'wrap', color: 'black', fontSize: 20  }}
                          selectionColor={'#33cbf6'}
                          returnKeyType='next'
                          enablesReturnKeyAutomatically={true}
                          underlineColorAndroid={'transparent'}
                          onSubmitEditing={()=>{this.passwordField.focus();}}
                          onChangeText={(emailId) =>
                            {
                              if(emailId[0] != ' '){
                                this.setState({emailId: emailId })
                              }
                            }
                          }
                          value={this.state.emailId} />
                    </View>
                    <View style={{ flex:0.1, backgroundColor: "white", borderWidth: 0}}>
                    </View>
                    <View style={{ flex:1, flexDirection: 'row', flexDirection: 'row'}}>
                      <View style={{ flex:1, backgroundColor: "white", borderWidth: 0, borderBottomColor: '#D3D3D3', borderBottomWidth: 0.5 }}>
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            placeholder="Password"
                            placeholderTextColor="#7f7f7f"
                            onEndEditing={this.passwordValid.bind(this)}
                            style={{ height: 70, flexWrap: 'wrap', color: 'black', fontSize: 20  }}
                            selectionColor={'#33cbf6'}
                            returnKeyType='done'
                            ref={(input) => { this.passwordField = input; }}
                            maxLength={20}
                            enablesReturnKeyAutomatically={true}
                            underlineColorAndroid={'transparent'}
                            onSubmitEditing={this.submit.bind(this)}
                            secureTextEntry={this.state.showpwd}
                            onChangeText={(password) =>
                              {
                                if(password[0] != ' '){
                                  this.setState({password: password })
                                }
                              }
                            }
                            value={this.state.password} />
                      </View>
                      <TouchableOpacity onPress={this.passwordToggle.bind(this)}style={{ flex:0.2, backgroundColor: "white", borderWidth: 0, flexWrap: 'wrap', borderBottomColor: '#D3D3D3', borderBottomWidth: 0.5 , alignItems:'center', justifyContent:'flex-end'}}>
                        {this.pwdHideAndShow()}
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex:0.1, backgroundColor: "white", borderWidth: 0}}>
                    </View>
              </View>

            </View>
            <View style={{ flex: 0.9, borderWidth: 0}}>
              <View style={{ flex: 3, borderWidth: 0}}>
                <View style={{ flex: 3, borderWidth: 0}}>
                  <View style={{ flex: 1, borderWidth: 0}}>
                  </View>
                  <TouchableOpacity onPress={this.submit.bind(this)} style={{ flex: 1.5, borderWidth: 0, backgroundColor: "#33cbf6", borderRadius: 5, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color: "white", fontSize: 20, fontWeight: '500'}}>
                    SIGN UP
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1, borderWidth: 0}}>
                  </View>
                </View>
                <View style={{ flex: 1, borderWidth: 0, flexDirection: "row"}}>
                  <View style={{ flex: 1, borderWidth: 0}}>
                    <View style={{ flex: 1, borderWidth: 0, borderBottomColor: '#D3D3D3', borderBottomWidth: 1}}>
                    </View>
                    <View style={{ flex: 1, borderWidth: 0}}>
                    </View>
                  </View>
                  <View style={{ flex: 0.3, borderWidth: 0, alignItems:'center', justifyContent:'center'}}>
                      <Text style={{ fontWeight: '200', fontSize: 15}}>
                        OR
                      </Text>
                  </View>
                  <View style={{ flex: 1, borderWidth: 0}}>
                    <View style={{ flex: 1, borderWidth: 0, borderBottomColor: '#D3D3D3', borderBottomWidth: 1}}>
                    </View>
                    <View style={{ flex: 1, borderWidth: 0}}>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 2, borderWidth: 0}}>
                  <View style={{ flex: 0.5, borderWidth: 0}}>
                  </View>
                  <View style={{ flex: 1, borderWidth: 0, flexDirection: "row"}}>
                    <View style={{ flex: 1.2, borderWidth: 0, flexDirection: "row"}}>
                    </View>
                    <TouchableOpacity style={{ flex: 0.8, borderWidth: 0, flexDirection: "row"}}>
                        <Image source={require('../assets/images/fb.png')} resizeMode='contain' style={{height:50, width:50}}/>
                    </TouchableOpacity>
                    <View style={{ flex: 0.2, borderWidth: 0, flexDirection: "row"}}>
                    </View>
                    <TouchableOpacity style={{ flex: 0.8, borderWidth: 0, flexDirection: "row"}}>
                      <Image source={require('../assets/images/google.png')} resizeMode='contain' style={{height:50, width:50}}/>
                    </TouchableOpacity>
                    <View style={{ flex: 1, borderWidth: 0, flexDirection: "row"}}>
                    </View>
                  </View>
                  <View style={{ flex: 0.5, borderWidth: 0}}>
                  </View>
              </View>
            </View>
        </View>
        <TouchableOpacity style={{ flex: 0.08, borderWidth: 0, alignItems:'center', justifyContent:'center', backgroundColor: "#5f42f4"}}>
          <Text style={{color: "white", fontSize: 17}}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>

      </View>
        {this.spinnerComponent()}

      </SafeAreaView>
      </TouchableWithoutFeedback>
      </View>


    );
  }
}

export {Signup};
