import React from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import {getVotes, curatedResults} from '../../api'
import {setLoader} from '../../actions'
import {roomMatesLimit} from '../../constants'

const styles = StyleSheet.create({
  container: { alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10, alignItems: 'stretch', flexDirection: 'column' },
  header: {flex: 1, fontWeight: 'bold'},
  card: {marginBottom: 20, borderWidth: 1, borderColor: '#CCC', padding: 10, borderRadius: 4},
  offer: {marginTop: 10}
})

class Results extends React.Component {
  static navigationOptions = {
    title: 'Choose from the list',
  }
  componentDidMount () {
    const { showLoader, checkVotes } = this.props
    showLoader(true)
    checkVotes()
  }
  getBgColor = (personCount) => {
    if (personCount >= roomMatesLimit) {
      return '#f4ce42'
    }
    if (personCount >= roomMatesLimit - 1) {
      return '#f7dc79'
    }
    return '#fff2c6'
  }
  render () {
    const { loader, votes } = this.props
    if (loader) {
      return (
        <View style={styles.container}>
          <Text>Loading..</Text>
        </View>
      )
    }
    const results = curatedResults(votes)
    return results && results.length ? <ScrollView contentContainerStyle={styles.container}>
        {results.map((results) => <View style={{...styles.card, backgroundColor: this.getBgColor(results.count)}} key={results.interest.id}>
          <Text style={styles.header}>{results.interest.name} {`(${results.count} person${results.count > 1 ? 's' : ''})`}</Text>
          {results.interest.offers && results.interest.offers.map(({name}) => <View style={styles.offer}><Text key={name}>{name}</Text></View>)}
        </View>)}
      </ScrollView> : null
  }
}

export default connect(
  ({ votes, loaders }) => ({
    votes,
    loader: loaders.results
  }),
  dispatch => ({
    showLoader: value => {
      dispatch(setLoader('results', value))
    },
    checkVotes: () => {
      getVotes(() => {
        dispatch(setLoader('results', false))
      }, dispatch)
    }
  })
)(Results)
