/** Imports escenciales para la clase. */
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import StylesConf from '../../utils/StylesConfiguration';
import Icon from '../../components/Icon';
import DateFormatter from '../../components/DateFormatter';
import StylesConfiguration from '../../utils/StylesConfiguration';
const { width } = Dimensions.get('window');
// comment_comment_created
// follow_request_received
// post_reaction_created
// follow_request_accepted
// post_comment_created

/** Declaracion de las Props. */
interface NotificationProps {
  /** [type]: Tipo de notificacion a mostrar. */
  // type?: 'like' | 'message' | 'challenge';
  type?: 'comment_comment_created' | 'follow_request_received' | 'post_reaction_created' | 'follow_request_accepted' | 'post_comment_created';
  /** [notification]: Variable para definir de quien biene dicha notificacion. */
  notification: any;
  /** [onPress]:  Funcion para realizar una accion al presionar la notificacion. */
  onPress: () => void;
  /** [onProfile]:  Funcion para realizar una accion al presionar la notificacion. */
  onProfile: () => void;
  /** [onAccept]: Funcion para aceptar una solicitud de seguimiento */
  onAccept: () => void;
  /** [onLike]: Funcion para aceptar una solicitud de seguimiento */
  onLike: () => void;
  /** [onReject]: Funcion para rechazar una solicitud de seguimiento */
  onReject: () => void;
  /** [date]:  Descripcion de la propiedad */
  date: string;
}

/** 
*[Notification]: Componente para visualizar las notificaciones dentro de la pantalla dependiendo el tipo de notificaciones. 
*/
const Notification = ({ type, notification, onPress, onProfile, onAccept, onLike, onReject, date }: NotificationProps) => {
  switch (type) {
    case 'comment_comment_created':
      return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={styles.userImgContainer}>
            <Image style={styles.userImg} source={{ uri: notification?.photo || 'https://images.pexels.com/photos/5422694/pexels-photo-5422694.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>
              <Text onPress={onProfile} style={[styles.detail, { color: StylesConf.color }]}>@{notification?.display_name}</Text>
               comento tu publicación</Text>
            <DateFormatter date={date} />
          </View>
          <View style={styles.commentContainer}>
            <Image style={styles.commentImage} source={{ uri: notification.image || 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
          </View>
        </TouchableOpacity>
      )
    case 'follow_request_received':
      return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={styles.userImgContainer}>
            <Image style={styles.userImg} source={{ uri: notification?.photo || 'https://images.pexels.com/photos/5422694/pexels-photo-5422694.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>A <Text onPress={onProfile} style={[styles.detail, { color: StylesConf.color }]}>@{notification?.display_name}</Text> quiere seguirte</Text>
            <DateFormatter date={date} />
          </View>
          <View style={styles.followRequestContainer}>
            <Icon source={'check'} color={StylesConfiguration.color} onPress={onAccept} />
            <Icon source={'delete'} color={'red'} onPress={onReject} />
          </View>
        </TouchableOpacity>
      )
    case 'follow_request_accepted':
      return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={styles.userImgContainer}>
            <Image style={styles.userImg} source={{ uri: notification?.photo || 'https://images.pexels.com/photos/5422694/pexels-photo-5422694.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}><Text onPress={onProfile} style={[styles.detail, { color: StylesConf.color }]}>@{notification?.display_name}</Text> te sigue, queres seguirlo vos tambien?</Text>
            <DateFormatter date={date} />
          </View>
          <View style={styles.commentContainer}>
            <Icon source={'FC_Logo'} color={StylesConfiguration.color} size={40} />
          </View>
        </TouchableOpacity>
      )
    case 'post_reaction_created':
      return (
        <TouchableOpacity onPress={onLike} style={styles.container}>
          <View style={styles.userImgContainer}>
            <Image style={styles.userImg} source={{ uri: notification?.photo || 'https://images.pexels.com/photos/5422694/pexels-photo-5422694.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>A <Text onPress={onProfile} style={[styles.detail, { color: StylesConf.color }]}>@{notification?.display_name}</Text> le gusta tu publicación</Text>
            <DateFormatter date={date} />
          </View>
          <View style={styles.commentContainer}>
            <Image style={styles.commentImage} source={{ uri: notification.image || 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
          </View>
        </TouchableOpacity>
      )
    case 'post_comment_created':
      return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={styles.userImgContainer}>
            <Image style={styles.userImg} source={{ uri: notification?.photo || 'https://images.pexels.com/photos/5422694/pexels-photo-5422694.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}><Text onPress={onProfile} style={[styles.detail, { color: StylesConf.color }]}>@{notification?.display_name}</Text> comentó tu publicación</Text>
            <DateFormatter date={date} />
          </View>
          <View style={styles.commentContainer}>
            <Image style={styles.commentImage} source={{ uri: notification.image || 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
          </View>
        </TouchableOpacity>
      )
    default:
      return (<View />);
  }
}

/** Exportamos el componente. */
export default Notification;

/** Estilos del componente */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    height: 70
  },
  userImgContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailContainer: {
    width: '60%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  detail: {
    fontSize: 15,
    color: 'white',
  },
  followRequestContainer: {
    width: '18%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeImage: {
    width: 60,
    height: 60,
  },
  challengeContainer: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: StylesConf.color,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeText: {
    fontSize: 15,
    color: 'white',
  },
  commentContainer: {
    width: '18%',
    alignItems: 'center',
  },
  commentImage: {
    height: 60,
    width: 60,
    resizeMode: 'cover'
  }
})