import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FormButton_small from '../../../components/FormButton_small';
import FormSearchInput from '../../../components/FormSearchInput';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import Icon from '../../../components/Icon';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const PostLikes = ({navigation, route}) => {
  //trae el nombre del usuario
  //console.log(route.params);

  const data = [
    {
      id: 0,
      photo: 'url',
    },
    {
      id: 1,
      photo: 'url',
    },
    {
      id: 2,
      photo: 'url',
    },
    {
      id: 3,
      photo: 'url',
    },
    {
      id: 4,
      photo: 'url',
    },
    {
      id: 5,
      photo: 'url',
    },
    {
      id: 6,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 8,
      photo: 'url',
    },
    {
      id: 9,
      photo: 'url',
    },
    {
      id: 10,
      photo: 'url',
    },
    {
      id: 11,
      photo: 'url',
    },
    {
      id: 12,
      photo: 'url',
    },
  ];

  const showPublication = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.column_back}>
        <TouchableOpacity onPress={showPublication}>
          <Image
            style={styles.boton_back}
            source={require('../../../assets/boton_volver_atras.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.sub_colummn}>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'GothamBlack-normal'
              }}>
              Seguidores
            </Text>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'GothamBlack-normal',
                top: 20,
              }}>
              Otros
            </Text>
          </View>

          <View style={styles.sub_colummn}>
            <FormButton_small buttonTitle="4001" />
            <FormButton_small buttonTitle="5645" />
          </View>

          <View style={styles.sub_colummn}>
            <Icon source={'favorite'} color="red" size={32} />
            <Text
              style={{
                color: 'white',
                // fontFamily: 'GothamBlack-normal'
              }}>
              9646
            </Text>
          </View>

          <View style={styles.sub_colummn}>
            <Image source={require('../../../assets/dog.png')} />
          </View>
        </View>

        <View style={styles.row}>
          <FormSearchInput />
        </View>

        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <ScrollView>
                <View style={styles.row}>
                  <View style={styles.contentViewIcon}>
                    <Image
                      source={require('../../../assets/pride-dog_1.png')}
                      resizeMode="contain"
                      style={styles.image}
                    />
                    <View style={styles.contentView}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: StylesConfiguration.fontWeight,
                          fontFamily: StylesConfiguration.fontFamily,
                          left: 5,
                        }}>
                        @Gruñon
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          // fontFamily: 'GothamBlack-Normal',
                          left: 5,
                        }}>
                        #QuedateEnCasa
                      </Text>
                    </View>
                  </View>

                  <View style={styles.contentViewAction}>
                    <Image
                      source={require('../../../assets/icono_home.png')}
                      resizeMode="contain"
                      style={styles.image_icon}
                    />
                    <View style={styles.contentView}>
                      <Icon
                        source={'email'}
                        color={StylesConfiguration.color}
                        size={32}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  column_back: {
    flexDirection: 'column',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginBottom: 5,
    top: 5,
  },
  row_comment: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap',
  },
  boton_back: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sub_colummn: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },

  image_icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },

  contentView: {
    flexDirection: 'column',
  },
  contentViewIcon: {
    flexDirection: 'row',
    top: 10,
  },
  contentViewAction: {
    flexDirection: 'row',
    marginLeft: 10,
    top: 10,
  },
  style_mensaje_hashtag: {
    color: 'blue',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
  },
  style_mensaje_publicacion: {
    color: 'white',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    left: 10,
  },

  style_mensaje_respuesta: {
    color: 'white',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    left: 10,
  },
});

export default PostLikes;
