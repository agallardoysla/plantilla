import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import FormSearchInput from '../components/FormSearchInput';
import StylesConfiguration from '../utils/StylesConfiguration';

const MyConversations = ({navigation}) => {
  const go_back = () => {
    navigation.navigate('Profile');
  };

  const data = [
      {id: 1, name: 'example 1'},
      {id: 2, name: 'example 2'},
      {id: 3, name: 'example 3'},
      {id: 4, name: 'example 4'},
      {id: 5, name: 'example 5'},
      {id: 6, name: 'example 6'},
]

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.header}>
          <TouchableOpacity onPress={go_back}>
            <Image
              style={styles.boton_back}
              source={require('../assets/boton_volver_atras.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Image
            source={require('../assets/sobre_amarillo.png')}
            style={styles.sobre_amarillo}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={styles.row}>
        <FormSearchInput />
      </View>


        <FlatList 
            data={data}
            renderItem={(item, i) => {
              return  <View style={styles.row}>
                <View style={{flexDirection: 'column', top: 10}}>
                  <Image
                    source={require('../assets/pride-dog_1.png')}
                    resizeMode="contain"
                    style={styles.image}
                  />
                </View>
                <View style={{flex: 1, flexDirection: 'column', top: 10}}>
                <Text style={styles.text_title_profile}>@Skay</Text>
                <Text style={styles.text_description}><Text style={styles.text_title_profile}>@Gruñon: </Text>Buen dia como estas?</Text>
                </View>
              </View>
            }}
            keyExtractor={(item)=> {item.id}}
        />
     



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'black',
    marginBottom: 10,
  },
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
  boton_back: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  text_title_profile: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
  
  },
  text_description: {
    fontFamily: 'GothamBlack-Normal',
    color: 'white',
    marginHorizontal: 10
  }
});

export default MyConversations;
