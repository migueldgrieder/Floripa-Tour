import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AttractionListScreen extends React.Component {
  static navigationOptions = {
    title: 'Todas Atrações',
  };
 
  constructor(props){
    super(props);
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
    this.focusListener.remove();
  } 
 
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
 
    const {navigate} = this.props.navigation;
    return(
      <ScrollView style={styles.container}>

        <FlatList
          data={this.state.Attractions}
          renderItem={({item}) =>
          <TouchableOpacity>
            <View>
              <Text onPress={ () => navigate('AttractionDetails', {Attraction: item})} style={styles.Attraction}>{item.name} </Text>
              <Image  style={styles.imageView} source={{ uri: item.photo }} />
            </View>
          <Button  title="Adicionar aos Favoritos " style={styles.AttractionFav}
           onPress={async () => {
                      const AttractionsFavorites = await AsyncStorage.getItem(
                        'AttractionFavorite'
                      )
                      const items = AttractionsFavorites ? JSON.parse(AttractionsFavorites) : []
                      if (items.indexOf(item.name) === -1) {
                        items.push(item.name)
                        await AsyncStorage.setItem(
                          'AttractionFavorite',
                          JSON.stringify(items)
                        )
                      } else {
                        console.log('error')
                      }
                    } } />
          <Button  title="Remover dos Favoritos " style={styles.AttractionFav}
           onPress={async () => {
                      const AttractionsFavorites = await AsyncStorage.getItem(
                        'AttractionFavorite'
                      )
                      const items = AttractionsFavorites ? JSON.parse(AttractionsFavorites) : []
                      if (items.indexOf(item.nome) > -1) {
                        items.splice(items.indexOf(item.nome), 1)
                        await AsyncStorage.setItem(
                          'AttractionFavorite',
                          JSON.stringify(items)
                        )
                      } else {
                        console.log('error')
                      }
                    }} /> 



          </TouchableOpacity>
          
          }
          
        />
        <View>
        <Button title="Voltar" onPress={() => navigate('Home')} />
        </View>
        </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
   padding: 15
  },
  Attraction: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  imageView: {
    width: '100%',
    height: 100,
  },
})