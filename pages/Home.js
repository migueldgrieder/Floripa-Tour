import * as React from 'react';
import { View, Text, Image, Button, BackHandler, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Atrações de Florianópolis',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../assets/floripa.png')} />
          <Text style={styles.title} > Floripa Tour</Text>
        </View>
        <View style={styles.button}>
          <Button title="Todas Atrações" onPress={() => navigate('AttractionList')} />
        </View>
        <View style={styles.button}>
          <Button title="Atrações Favoritas" onPress={() => navigate('AttractionsFavorites')} />
        </View>
        <View style={styles.button}>
          <Button title="Sair" onPress={() => BackHandler.exitApp() } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  logo: {
    height: 200,
    width: 160,
  },
  title: {
    padding: 30,
    fontSize: 18,
  },
  button: {
    padding: 15
  }
});