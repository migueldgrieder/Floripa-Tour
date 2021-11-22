import * as React from 'react';
import { Text, Image, View, StyleSheet, Button, Linking } from 'react-native';
import { Platform } from 'react-native';

export default class AttractionDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Dados da Atração',
  };

  constructor(props) {
    super(props);
    let Attraction = props.navigation.getParam('Attraction');
    this.state = {
      name: Attraction.name,
      email: Attraction.email,
      phone: Attraction.phone,
      lat: Attraction.address.geo.lat,
      lng: Attraction.address.geo.lng,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const { name, email, phone, lat, lng } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.AttractionName}>{name}</Text>
          <Image style={styles.logo} source={require('../assets/floripa.png')} />
          <Text style={styles.AttractionDetails}>Horario: </Text>
          
          
         
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => Linking.openURL(`mailto:${email}`)}
            title=<Text style={styles.AttractionDetails}>E-mail: {email}</Text>
          />
          <Button
            onPress={() => Linking.openURL(`tel:${phone}`)}
            title= <Text style={styles.AttractionDetails}>Telefone: {phone}</Text>
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => Linking.openURL('www.google.com')}
            title="Site"
          />
          <Button
            onPress={() => Linking.openURL('www.google.com')}
            title=<Text style={styles.AttractionDetails}>Endereco: {phone}</Text>
          />
          <Button
            onPress={() => Linking.openURL('www.google.com')}
            title="Vídeo"
          />
        </View>
        <Button  title="Adicionar aos favoritos" onPress={() => navigate('Home')} />
         <Button  title="Remover dos favoritos" onPress={() => navigate('Home')} />
        <Button title="Voltar" onPress={() => navigate('AttractionList')} />
      </View>
    );
  }
}

/*
const mapUrl = Platform.select({
   android: geo:0,0?q=latitude,longitude
}); */



const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    width: 160,
  },
  AttractionName: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  AttractionDetails: {
    fontSize: 16,
    height: 44,
  },
  button: {
    padding: 15,
  },
});
