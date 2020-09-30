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
import StylesConfiguration from '../../utils/StylesConfiguration';
import FormButton_small from '../../components/FormButton_small';
import {Icon} from 'react-native-elements';

let window = Dimensions.get('window');

const Followed = ({navigation}) => {
  const data = [
    {
      id: 0,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 1,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 2,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 3,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 4,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 5,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 6,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 8,
      photo: 'url',
      name_user: 'name',
    },
  ];

  const go_back = () => {
    navigation.navigate("Profile")
  }

  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={styles.column}>
        <TouchableOpacity onPress={go_back}>
          <Image
            style={styles.boton_back}
            source={require('../../assets/boton_volver_atras.png')}
          />
        </TouchableOpacity>
        <Text style={styles.titulo}>SEGUIDOS</Text>

        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.row_content}>
              <Image
                source={require('../../assets/pride-dog_1.png')}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.text}>@Skay</Text>
              <Icon name="email" color={StylesConfiguration.color} size={32} />
              <FormButton_small buttonTitle="Borrar" />
              <FormButton_small buttonTitle="Bloquear" />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: window.width,
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

export default Followed;
