import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import Card from '../../components/Cards'
import { ACTIVITES } from '../../constants'
import { connect } from 'react-redux'
import { changeInterests, setLoader} from '../../actions'
import Button from '../../components/Button'
import {submitVotes, getVotes, checkVotes} from '../../api'

const buttonHeight = 50

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  section: {
    flex: 1
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  onCardPress = (id, add) => () => {
    const {interestSelected} = this.props
    interestSelected(id, add)
  }
  onSubmit = () => {
    this.props.showLoader(true)
    const {userInterests} = this.props
    submitVotes(userInterests, (success) => {
      if(success) {
        this.props.proceedToDashboard()
      }
    })
  }
  render() {
    const {userInterests, loader} = this.props
    return (
      <View style={styles.section}>
        <ScrollView contentContainerStyle={styles.container}>
          {ACTIVITES.map(({id, name, url}) => <TouchableOpacity onPress={this.onCardPress(id, !userInterests.includes(id))} key={id}>
            <Card name={name} url={url} selected={userInterests.includes(id)} />
          </TouchableOpacity>)}
        </ScrollView>
        <View style={styles.buttonArea}>
          {!loader ? <Button text='SUBMIT' onPress={this.onSubmit} style={styles.button} /> : null }
        </View>
      </View>
    );
  }
}


export default connect(({ userInterests, loaders }) => {
  return {
    userInterests,
    loader: loaders.voting
  }
}, (dispatch, {navigation}) => {
  return {
    interestSelected: (id, add) => {
      dispatch(changeInterests(id, add))
    },
    proceedToDashboard: () => {
      getVotes(() => {
        dispatch(setLoader('voting', false))
        navigation.navigate('Dashboard')
      }, dispatch)
    },
    showLoader: (value) => {
      dispatch(setLoader('voting', value))
    }
  }
})(Voting)