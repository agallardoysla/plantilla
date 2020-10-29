import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FormImageIcon from '../../../components/FormImageIcon';
import FormLike from '../../../components/FormLike';
import profileLikes from '../../../services/profiles_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';

export default function ProfileCenterColumn({user, navigation, style, isLoggedUser}) {
  const [iLiked, setILiked] = useState(false);

  useEffect(() => {
    profileLikes
      .getReactions(user.id)
      .then((res) =>
        setILiked(res.data.filter((item) => item.user === user.id).length >= 1),
      );
  }, []);

  const addReactions = () => {
    try {
      //si contiene algo lo elimino si no lo agrego
      if (iLiked) {
        profileLikes.deleteReactions(user.id).then((res) => {
          console.log('like eliminado');
          // setLikesCounter(likesCounter + 1);
        });
      } else {
        profileLikes.addReactions(user.id, 2).then((res) => {
          console.log('like agregado');
          // setLikesCounter(likesCounter + 1);
        });
      }
      setILiked(!iLiked);
    } catch (error) {
      console.log('Error de agregar like' + error);
    }
  };

  const goConversations = () => {
    if (isLoggedUser) {
      navigation.navigate('MyConversations');
    } else {
      console.log('otro');
      navigation.navigate('Chat', {
        receiver: {user_id: user.id, display_name: user.display_name},
      });
    }
  };

  return (
    <View style={style}>
      <View style={styles.profleFoto}>
        <FormImageIcon
          size={24}
          source={require('../../../assets/foto_perfil_superior.png')}
        />
      </View>

      <View style={styles.infoContainer}>
        {isLoggedUser ? (
          <TouchableOpacity
            style={styles.tuerca_blanca_container}
            onPress={() => navigation.navigate('Preferences')}>
            <Image
              source={require('../../../assets/tuerca_blanca.png')}
              style={styles.tuerca_blanca}
              resizeMode={'center'}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.tuerca_blanca_container} />
        )}
        <Text style={styles.name_user}>@{user.display_name}</Text>
      </View>

      <TouchableOpacity onPress={addReactions}>
        <View style={styles.folowersInfo}>
          <FormLike iLiked={iLiked} />
          <Text style={styles.icon_numbers}>{8}k</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goConversations}>
        <Image
          source={require('../../../assets/sobre_amarillo.png')}
          style={styles.sobre_amarillo}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profleFoto: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  tuerca_blanca_container: {
    marginRight: 3,
    width: 20,
    height: 20,
  },
  tuerca_blanca: {
    width: 20,
    height: 20,
    borderRadius: 15,
  },
  name_user: {
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 14,
    textAlign: 'center',
    color: StylesConfiguration.color,
  },
  sobre_amarillo: {
    alignSelf: 'center',
    width: 55,
    height: 55,
  },
  folowersInfo: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  icon_numbers: {
    marginLeft: 4,
    color: 'white',
  },
});
