import * as React from 'react';
import { Text, Image, View, StyleSheet, Button, Linking, TouchableOpacity } from 'react-native';
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
      address: Attraction.address,
      phone: Attraction.phone,
      description: Attraction.description,
      photo: Attraction.photo,
      time: Attraction.time,
      site: Attraction.site,
      video: Attraction.video,
      ticket: Attraction.ticket,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const { name, address, phone, description, photo, time, site, video, ticket } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.AttractionName}>{name}</Text>
          <Image style={styles.logo} source={{ uri: photo }} />
          <Text style={styles.AttractionDescription}>{description}</Text>
           {time && ( <Text style={styles.AttractionTimeTicket}>Horario:{time} </Text>) }
           {ticket && ( <Text style={styles.AttractionTimeTicket}>Ingresso:{ticket} </Text>) }
          
         
        </View>

        {phone && (
        <View>
            <View style={styles.containerDetails}>
              
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${phone}`)}
              >
                <Text style={styles.AttractionDetails}>{phone}</Text>
              </TouchableOpacity>
            </View>
          </View>
            )
                }
  
        {site && (
        <View>
            <View style={styles.containerDetails}>
              
              <TouchableOpacity
                onPress={() => Linking.openURL(site)}
              >
                <Text style={styles.AttractionDetails}>Abrir Site</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
                }
        {address && (
           <View>
            <View style={styles.containerDetails}>
              
              <TouchableOpacity
                onPress={() => Linking.openURL(`https://www.google.com/maps/search/${address}`)}
              >
                <Text style={styles.AttractionDetails}>Abrir Localização</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
                }

        {video && (
           <View>
            <View style={styles.containerDetails}>
              
              <TouchableOpacity
                onPress={() =>  Linking.openURL(video)}
              >
                <Text style={styles.AttractionDetails}>Ver Vídeo</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
                }

        <View  style={styles.containerDetails}>

  
         
         </View>
        <Button title="Voltar" onPress={() => navigate('AttractionList')} />
      </View>
    );
  }
}



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
    margin: 10
  },
  AttractionDescription: {
    fontSize: 16,
    margin: 10
  },
  AttractionTimeTicket: {
    fontSize: 16,
  }
});
