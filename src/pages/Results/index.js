import React from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import {getVotes, curatedResults} from '../../api'
import {setLoader} from '../../actions'
import InfoCard from '../../components/InfoCard'

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10 }
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
    return results && results.length ? <View style={styles.container}>
        {results.map((results) => <InfoCard key={results.interest.id}>{results.interest.name} {`(${results.count} person${results.count > 1 ? 's' : ''})`}</InfoCard>)}
      </View> : null
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
