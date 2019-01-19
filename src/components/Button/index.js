import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    minHeight: 50, 
    backgroundColor: '#44c7ff', 
    paddingLeft: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF'
  }
})

const Button = ({text, onPress, style = {}}) => <TouchableOpacity style={{...styles.button, ...style}} onPress={onPress}>
  <Text style={styles.buttonText}>{text}</Text>
</TouchableOpacity>

export default Button