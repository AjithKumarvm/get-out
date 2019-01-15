import React from 'react';
import { Text, View, Button } from 'react-native';
import Card from '../../components/Cards'

class Voting extends React.Component {
  static navigationOptions = {
    title: 'Choose your interests',
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Card />
      </View>
    );
  }
}

export default Voting