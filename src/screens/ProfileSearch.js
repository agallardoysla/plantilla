import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import StylesConfiguration from '../utils/StylesConfiguration';
import FormButton_small from '../components/FormButton_small';
import {Icon} from 'react-native-elements';

let window = Dimensions.get('window');

const ProfileSearch = ({item}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.column}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.row_content}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>@{item.display_name}</Text>
              <Text style={{color: 'white'}}>Descripciòn del Perfil</Text>
            </View>
          </View>
        </View>
      </View>

      <Icon name="email" color={StylesConfiguration.color} size={46} />
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontFamily: StylesConfiguration.fontFamily,
    color: StylesConfiguration.color,
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  boton_back: {
    marginHorizontal: 10,
    marginVertical: 10,
  },

  column: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'black',

  },
  row_content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 400 / 2,
    
  },
  text: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
  },
});

export default ProfileSearch;
