import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Icon } from 'react-native-elements';

const View_Publication = ({item}) => {
  return (
    <View>
      {/*Inicia Nombre de usuario como encabezado*/}
      <Text style={styles.encabezado_text}>@{item.user_owner.username}</Text>
      {/*Finaliza Nombre de usuario como encabezado*/}

      {/*Inicia Foto de la publicaciòn */}
      <Image
        source={require('../assets/foto_publicacion.png')}
        resizeMode="cover"
        style={styles.image_publication}
      />
      {/*Finaliza Foto de la publicaciòn*/}

      {/*Inicio de iconos de la publicaciòn*/}
      <View style={styles.icon_container}>
        <Image
          source={require('../assets/ojo_vista.png')}
          style={styles.icon_publication}
        />
        <Text style={{color: 'white', left: -15}}>5645</Text>

        <Icon
          name="favorite"
          color="#FFFFFF"
          style={styles.icon_publication}
        />
        <Text style={{color: 'white', left: -15}}>{item.reactionscount.TIPO_REACCION_PRUEBA}</Text>

        <Image
          source={require('../assets/comentario.png')}
          style={styles.icon_publication}
        />

        <Image
          source={require('../assets/compartir.png')}
          style={styles.icon_publication}
        />

        <Image
          source={require('../assets/menu_desbordamiento.png')}
          style={styles.icon_menu_desbordamiento}
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
        }}>
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
          width: window.width,
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  icon_container: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between', //espacio o separacion entre elementos
  },
  icon_publication: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  image_publication: {
    width: window.width,
    height: 300,
    alignContent: 'center',
    marginBottom: 5,
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

export default View_Publication;
