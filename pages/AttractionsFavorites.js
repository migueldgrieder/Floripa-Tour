import * as React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Button
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class FavPlacesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Atrações favoritas'
  }

  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  componentDidMount() {
    const { navigation } = this.props

    this.focusListener = navigation.addListener('didFocus', async () => {
      const value = await AsyncStorage.getItem('AttractionsFavorites')
      this.setState(
        {
          isLoading: false,
          places: JSON.parse(value)
        },
        function () {}
      )
    })
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    const { navigate } = this.props.navigation
    return (
      <View>
        <FlatList
          data={this.state.places}
          renderItem={({ item }) => (
            <View>
              <View>
                <Text style={styles.title} > {item}</Text>
              </View>
            </View>
          )}
        />
        <Button title="Voltar" style={styles.button} onPress={() => navigate('Home')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  firstContainer: {
    height: '100%'
  },
  title: {
    padding: 10,
    fontSize: 18,
  }
})