import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import {checkForUserId} from '../../api'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  buttonArea: {
    borderRadius: 0,
    paddingTop: 20,
    color: 'blue',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC'
  },
  button: {
    height: 40
  },
  section: {
    flex: 1
  }
})

class Dashboard extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  }
  componentDidMount() {
    checkForUserId((userId) => {
      console.warn('userId', userId)
      if(!userId) {
        this.props.navigation.navigate('Register')
      }
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.section}></View>
        <TouchableOpacity
          style={styles.buttonArea}
          title='Choose your interests'
          onPress={() => this.props.navigation.navigate('Voting')}
        ><Text style={styles.button}>Choose your interests</Text></TouchableOpacity>
      </View>
    )
  }
}

export default Dashboard
