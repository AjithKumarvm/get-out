import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import Card from '../../components/Cards'
import { ACTIVITES } from '../../constants'
import { connect } from 'react-redux'
import { changeInterests } from '../../actions'

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

class Voting extends React.PureComponent {
  static navigationOptions = {
    title: 'Choose your interests',
  }
  onCardPress = (name, add) => () => {
    const {interestSelected} = this.props
    interestSelected(name, add)
  }
  render() {
    const {userInterests} = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {ACTIVITES.map(({name, url}) => <TouchableOpacity onPress={this.onCardPress(name, !userInterests.includes(name))} key={name}>
          <Card name={name} url={url} selected={userInterests.includes(name)} />
        </TouchableOpacity>)}
      </ScrollView>
    );
  }
}


export default connect(({ userInterests }) => {
  return {
    userInterests
  }
}, dispatch => {
  return {
    interestSelected: (interest, add) => {
      dispatch(changeInterests(interest, add))
    }
  }
})(Voting)