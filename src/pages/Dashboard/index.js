import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { getAsync, getVotes } from '../../api'
import { setLoader } from '../../actions'
import Button from '../../components/Button'
import InfoCard from '../../components/InfoCard'

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
    flex: 1,
    padding: 10
  },
  message: {
    marginTop: 20,
    marginBottom: 10
  }
})

class Dashboard extends React.Component {
  static navigationOptions = {
    title: 'Dashboard'
  }
  componentDidMount () {
    console.warn('dashboard mount')
    const { showLoader, checkVotes } = this.props
    showLoader(true)
    getAsync('userId', userId => {
      if (!userId) {
        this.props.navigation.navigate('Register')
        showLoader(false)
      } else {
        checkVotes()
      }
    })
  }
  onResults = () => {
    this.props.navigation.navigate('Results')
  }
  render () {
    const { votes, votingEnded, dashboard } = this.props
    if (dashboard) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          {votes && !votingEnded ? (
            <InfoCard>You have already voted. Waiting for others</InfoCard>
          ) : null}
          {votingEnded ? <React.Fragment>
            <View style={styles.message}><Text>Everybody has choosed their interests.</Text></View>
            <Button text='SEE RESULTS' onPress={this.onResults} />
          </React.Fragment> : null}
        </View>
        <TouchableOpacity
            style={styles.buttonArea}
            title='Choose your interests'
            onPress={() => this.props.navigation.navigate('Voting')}
          >
            <Text style={styles.button}>{`${votes ? 'Change' : 'Choose'} your interests`}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const VisibleDashboard = connect(
  ({ votes, votingEnded, loaders }) => ({
    votes,
    votingEnded,
    dashboard: loaders.dashboard
  }),
  dispatch => ({
    showLoader: value => {
      dispatch(setLoader('dashboard', value))
    },
    checkVotes: () => {
      getVotes(() => {
        dispatch(setLoader('dashboard', false))
      }, dispatch)
    }
  })
)(Dashboard)

export default VisibleDashboard
