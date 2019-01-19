import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#80f442',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10
  }
})

export default ({children}) => <View style={styles.infoCard}><Text>{children}</Text></View>