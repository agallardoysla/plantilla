import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PostComments from './PostComments';

let window = Dimensions.get('window');

export default function View_Publication({item, navigation}) {
  const showComments = () => {
    navigation.navigate('PostComments');
  };

  return (
    <View style={styles.container}>
      {/*Inicia Nombre de usuario como encabezado*/}
      <Text style={styles.encabezado_text}>@{item.user_owner.username}</Text>
      {/*Finaliza Nombre de usuario como encabezado*/}

      {/*Inicia Foto de la publicaciòn */}
      <View style={styles.postImagesContainer}>
        <ScrollView horizontal={true} indicatorStyle="white">
          {item.files_with_urls.map((image, i) => (
            <Image
              source={{uri: image.url}}
              style={styles.image_publication}
              key={i}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>
      {/*Finaliza Foto de la publicaciòn*/}

      {/*Inicio de iconos de la publicaciòn*/}
      <View style={styles.icon_container}>
        <Image
          source={require('../assets/ojo_vista.png')}
          style={[styles.icon_publication, styles.icon_ojo]}
        />
        <Text style={styles.icon_numbers}>{item.views_count}</Text>

        <Image
          source={require('../assets/corazon_gris.png')}
          style={[styles.icon_publication, styles.icon_corazon]}
        />
        <Text style={styles.icon_numbers}>
          {item.reactionscount.REACTION_TYPE_PRUEBA}
        </Text>

        <Image
          source={require('../assets/comentario.png')}
          style={[styles.icon_publication, styles.icon_comentario]}
          onPress={showComments}
        />

        <Image
          source={require('../assets/compartir.png')}
          style={[styles.icon_publication, styles.icon_compartir]}
        />

        <Image
          source={require('../assets/menu_desbordamiento.png')}
          style={[styles.icon_publication, styles.icon_mostrarMas]}
        />
      </View>
      {/*Fin de iconos de una publicaciòn*/}

      {/*Inicio de nombre de usuario y la descripciòn de la publicaciòn*/}
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: '#E8FC64',
            marginHorizontal: 10,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          {item.user_owner.username}
        </Text>
        <Text style={{color: 'white', alignItems: 'stretch', marginBottom: 10}}>
          {item.text}
        </Text>
      </View>
      {/*Fin de nombre de usuario y la descripciòn de la publicaciòn*/}

      {/*Inicio de Categorias dentro de una publicaciòn*/}
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: '#624CEE',
            marginHorizontal: 10,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          #Fiesta #cumpleañito #PapitaATodo
        </Text>
      </View>
      {/*Fin de Categorias dentro de una publicaciòn */}

      {/*Inicia comentario hacia la publicaciòn */}
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/foto.png')}
          style={styles.icon_profile}
        />

        <Text
          style={{
            color: '#E8FC64',
            marginBottom: 10,
            fontWeight: 'bold',
            paddingRight: 10,
          }}>
          @Gruñon
        </Text>
        <Text style={{color: 'white', alignItems: 'stretch', marginBottom: 10}}>
          No me invitaron
        </Text>
      </View>
      {/*Fin del comentario hacia la publicaciòn*/}

      {/*Inicia respuesta  hacia un comentario de la publicaciòn */}
      <View style={{flexDirection: 'row', paddingLeft: 20}}>
        <Image
          source={require('../assets/foto.png')}
          style={styles.icon_profile}
        />

        <Text
          style={{
            color: '#E8FC64',
            marginBottom: 10,
            fontWeight: 'bold',
            paddingRight: 10,
          }}>
          @User A @Gruñon
        </Text>
      </View>
      <Text
        style={{
          color: 'white',
          alignItems: 'stretch',
          marginBottom: 10,
          left: 70,
          top: -10,
        }}>
        Igual no ibas a venir
      </Text>
      {/*Fin de respuesta hacia un comentario de la publicaciòn*/}

      {/*Inicia contrarespuesta  del comentario */}
      <View style={{flexDirection: 'row', paddingLeft: 20}}>
        <Image
          source={require('../assets/foto.png')}
          style={styles.icon_profile}
        />

        <Text
          style={{
            color: '#E8FC64',
            marginBottom: 10,
            fontWeight: 'bold',
            paddingRight: 10,
          }}>
          @Gruñon A @User
        </Text>
      </View>
      <Text
        style={{
          color: 'white',
          alignItems: 'stretch',
          marginBottom: 10,
          left: 70,
          top: -10,
        }}>
        Tenes razon @User
      </Text>
      {/*Fin de contrarespuesta del comentario*/}

      {/*Inicia vista de total de comentarios */}
      <Text
        style={{
          color: 'gray',
          marginBottom: 10,
          left: 10,
          textAlign: 'left',
        }}
        onPress={showComments}>
        20 comentarios mas...
      </Text>
      {/*Fin de vista de total de comentarios */}

      {/*Inicia fecha*/}
      <Text
        style={{
          textAlign: 'right',
          color: 'gray',
          marginBottom: 10,
          right: 10,
        }}>
        Ayer a las 23:40
      </Text>
      {/*Finaliza fecha */}

      {/*Inicia franja amarilla */}
      <View
        style={{
          flex: 1,
          height: 70,
          backgroundColor: 'yellow',
        }}>
        <Image
          style={{
            alignContent: 'center',
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          source={require('../assets/franja_amarilla_imagen.png')}
          resizeMode="center"
        />
      </View>
      {/*Finaliza franja amarilla */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  encabezado_text: {
    textAlign: 'right',
    color: 'white',
    fontWeight: 'bold',
  },
  postImagesContainer: {
    flex: 1,
    height: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  image_publication: {
    width: window.width - 20,
    height: 300,
  },
  icon_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon_publication: {
    marginRight: 10,
  },
  icon_ojo: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  icon_corazon: {
    width: 20,
    height: 18,
    marginRight: 5,
  },
  icon_comentario: {
    width: 30,
    height: 30,
  },
  icon_compartir: {
    width: 23,
    height: 23,
  },
  icon_mostrarMas: {
    width: 33,
    height: 10,
  },
  icon_numbers: {
    color: 'white',
    marginRight: 15,
  },
  icon_menu_desbordamiento: {
    top: 5,
    left: -5,
  },
  icon_profile: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },
});
