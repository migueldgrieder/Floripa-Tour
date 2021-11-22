import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
 
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
      return fetch('https://api.jsonbin.io/b/619ac64401558c731cc6cd7a')
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
  favoritos: {
   fontSize: 222
  },
  container: {
   padding: 15
  },
  Attraction: {
    fontSize: 18,
    height: 44,
  }
})