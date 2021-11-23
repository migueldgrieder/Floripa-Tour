import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class PlacesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Atrações Turísticas'
  }

  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  componentDidMount(){
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      return fetch('https://api.jsonbin.io/b/619ae91962ed886f9152b29c')
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            isLoading: false,
            Attractions: json,
          }, function(){
          });
        })
        .catch((error) =>{
          console.error(error);
        });
    });
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
      <View style={styles.container}>
        <FlatList
          data={this.state.Attractions}
          renderItem={({ item }) => (
            <View>
              <View style={styles.containerImage}>
              <Text style={styles.title}>{item.name}</Text>
              <Image style={styles.imageView} source={{ uri: item.photo }} />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigate('PlacesDetails', { place: item })}
                >
                </TouchableOpacity>
                <View style={styles.secondContainerImage}>
                  <TouchableOpacity
                    onPress={async () => {
                      const placesList = await AsyncStorage.getItem(
                        'AttractionsFavorites'
                      )
                      const items = placesList ? JSON.parse(placesList) : []
                      if (items.indexOf(item.name) === -1) {
                        items.push(item.name)
                        await AsyncStorage.setItem(
                          'AttractionsFavorites',
                          JSON.stringify(items)
                        )
                      } else {
                        console.log('error')
                      }
                    }}
                  >
                    <View style={styles.containerTitle}>
                      <Text style={styles.favorite}>Adicionar aos Favoritos</Text>
                      
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      const placesList = await AsyncStorage.getItem(
                        'AttractionsFavorites'
                      )
                      const items = placesList ? JSON.parse(placesList) : []
                      if (items.indexOf(item.name) > -1) {
                        items.splice(items.indexOf(item.name), 1)
                        await AsyncStorage.setItem(
                          'AttractionsFavorites',
                          JSON.stringify(items)
                        )
                      } else {
                        console.log('error')
                      }
                    }}
                  >
                    <View style={styles.containerTitle}>
                      <Text style={styles.favorite}>Remover dos Favoritos</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <Button title="Voltar" onPress={() => navigate('Home')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: '100%'
  },
  imageView: {
    width: '100%',
    height: 100,
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue'
  },
  favorite: {  
  fontSize: 14,

  },
 
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5
  }

})