import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Card from '../../components/Cards'

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

const activities = [{
  name: 'Trekking',
  url: 'http://lorempixel.com/g/1440/900/'
},
{
  name: 'Trip',
  url: 'http://lorempixel.com/g/1440/900/'
},
{
  name: 'Sports',
  url: 'http://lorempixel.com/g/1440/900/'
},
{
  name: 'Board Games',
  url: 'http://lorempixel.com/g/1440/900/'
}]
class Voting extends React.Component {
  static navigationOptions = {
    title: 'Choose your interests',
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {activities.map(({name, url}) =>  <Card name={name} url={url} />)}
      </ScrollView>
    );
  }
}

export default Voting