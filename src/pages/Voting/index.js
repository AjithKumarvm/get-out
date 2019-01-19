import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import Card from '../../components/Cards'
import { ACTIVITES } from '../../constants'
import { connect } from 'react-redux'
import { changeInterests } from '../../actions'
import Button from '../../components/Button'
import {submitVotes, getVotes} from '../../api'

const buttonHeight = 50

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  section: {
    flex: 1
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    maxHeight: buttonHeight
  },
  button: {
    maxHeight: buttonHeight,
    flex: 1
  }
})

class Voting extends React.PureComponent {
  static navigationOptions = {
    title: 'Choose your interests',
  }
  componentDidMount () {
    
  }
  onCardPress = (id, add) => () => {
    const {interestSelected} = this.props
    interestSelected(id, add)
  }
  onSubmit = () => {
    const {userInterests} = this.props
    submitVotes(userInterests, (success) => {
      if(success) {
        this.props.navigation.navigate('Dashboard')
      }
    })
  }
  render() {
    const {userInterests} = this.props
    return (
      <View style={styles.section}>
        <ScrollView contentContainerStyle={styles.container}>
          {ACTIVITES.map(({id, name, url}) => <TouchableOpacity onPress={this.onCardPress(id, !userInterests.includes(id))} key={id}>
            <Card name={name} url={url} selected={userInterests.includes(id)} />
          </TouchableOpacity>)}
        </ScrollView>
        <View style={styles.buttonArea}>
          <Button text='SUBMIT' onPress={this.onSubmit} style={styles.button} />
        </View>
      </View>
    );
  }
}


export default connect(({ userInterests }) => {
  return {
    userInterests
  }
}, dispatch => {
  return {
    interestSelected: (id, add) => {
      dispatch(changeInterests(id, add))
    }
  }
})(Voting)