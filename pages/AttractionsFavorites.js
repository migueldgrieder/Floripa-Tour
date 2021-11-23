import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AttractionsFavoritesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Atrações Favoritas',
  };
 
  constructor(props){
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    const { navigation } = this.props

    this.focusListener = navigation.addListener('didFocus', async () => {
      const value = await AsyncStorage.getItem('favoriteAttraction')
      this.setState(
        {
          isLoading: false,
          attraction: JSON.parse(value)
        },
        function () {}
      )
    })
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
          data={this.state.attraction}
          renderItem={({item}) =>
          <TouchableOpacity onPress={ () => navigate('AttractionDetails', {Attraction: item})}>
            <View>
              <Text style={styles.Attraction}>{item.name}</Text>
            </View>
            
          </TouchableOpacity>}
        />
        
        
        <Button title="Voltar" onPress={() => navigate('Home')} />
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
    height: 44,
  }
})