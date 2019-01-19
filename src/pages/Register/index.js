import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import { registerUser } from '../../api'
import Button from '../../components/Button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 10
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 4
  },
  button: {
    height: 40, 
    backgroundColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF'
  }
})

class Register extends React.Component {
  static navigationOptions = {
    title: 'Register',
  }
  state = {
    name: '',
    phone: '',
    houseId: '',
    loader: false
  }
  handleChange = (attr) => (text) => {
    this.setState({[attr]: text})
  }
  onRegister = () => {
    if (this.state.loader) {
      return
    }
    this.setState({loader: true})
    const {name, phone, houseId} = this.state
    registerUser({name, phone, houseId}, (success) => {
      if(success) {
        this.setState({loader: false})
        this.props.navigation.navigate('Dashboard')
        ToastAndroid.show('Registered Successfully', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Error. Please try again', ToastAndroid.SHORT);
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleChange('name')}
          value={this.state.name}
          placeholder='Name'
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleChange('phone')}
          value={this.state.phone}
          placeholder='Phone'
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleChange('houseId')}
          value={this.state.houseId}
          placeholder='House ID'
        />
        <Button text={this.state.loader ? '...' : 'SIGN UP'} onPress={this.onRegister} />
      </View>
    );
  }
}

export default Register