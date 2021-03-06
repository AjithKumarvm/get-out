import React from 'react'
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native'

const cardWidth = Dimensions.get('window').width / 2
const cardHeight = 150

const styles = StyleSheet.create({
  card:{
    width: cardWidth,
    padding: 5,
    paddingTop: 10
  },
  content: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    overflow: 'hidden'
  },
  image: {
    width: cardWidth - 12, 
    height: cardHeight
  },
  textArea: {
    padding: 5
  }
})

class Card extends React.PureComponent {
  render () {
    const {name, url, selected} = this.props
    return (
      <View style={styles.card}>
        <View style={{...styles.content, backgroundColor: selected ? '#0F0' : '#FFF'}}>
          <Image
            style={styles.image}
            source={{uri: url}}
          />
          <View style={styles.textArea}>
            <Text>{name}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Card
