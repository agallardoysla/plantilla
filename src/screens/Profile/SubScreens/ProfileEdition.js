import React, {useEffect, useRef, useState} from 'react';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import FormButton from '../../../components/FormButton';
import GenericPreferenceView from '../components/GenericPreferenceView';
import {Alert, Image, Keyboard, StyleSheet, Text, View} from 'react-native';
import profiles_services from '../../../services/profiles_services';
import users_services from '../../../services/users_services';
import MatInput from '../../../components/MatInput';
import Icon from '../../../components/Icon';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import NewPostInput from '../../NewPublication/components/NewPostInput';
import {batch, useDispatch, useSelector} from 'react-redux';
import {
  getLoggedUser,
  setNewDisplayName,
  setNewProfileBio,
} from '../../../reducers/loggedUser';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GoBackButton from '../../../components/GoBackButton';
import {recoverSession} from '../../../redux/actions/session';

export default function Preferences({navigation}) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const {id, display_name, profile} = user;
  const {id: profileId, bio} = profile;
  const hasBio = bio !== '__profile__bio__';
  const [username, setUsername] = useState(display_name);
  const [editUsername, toggleEditUsername] = useState(false);
  const [description, setDescription] = useState(
    hasBio
      ? bio
      : 'Aun no tenés una descripción. hazle saber al mundo quien eres',
  );
  const [editDescription, setEditingDescription] = useState(false);

  // const submitProfile = () => {
  //   profiles_services.edit(user.profile.id, user.profile);
  //   users_services.edit(id, {display_name: newNickname});
  //   setEditingNickname(false);
  //   setEditingDescription(false);
  //   batch(() => {
  //     dispatch(setNewDisplayName(newNickname));
  //     dispatch(setNewProfileBio(newBio));
  //   });
  // };

  // const canPublish = () => {
  //   return newNickname.length > 3;
  // }

  // const takeNewProfilePhoto = () => {

  //   navigation.navigate('NewProfilePhoto');

  //   };

  // const handleEditProfileFocus = () => {
  //   if (!hasBio) {
  //     setNewBio('');
  //   }
  // };

  // const onGoBack = () => {
  //   toggleEditUsername(false);
  //   setEditingDescription(false);
  //   setUsername(display_name);
  //   setDescription(
  //     hasBio
  //       ? bio
  //       : 'Aun no tenés una descripción. hazle saber al mundo quien eres',
  //   );
  // };

  const Options = ({handleCancelar, handleAceptar}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <FormButton
          buttonTitle="Cancelar"
          style={styles.actionMin}
          onPress={handleCancelar}
        />
        <FormButton
          buttonTitle="Aceptar"
          style={styles.actionMin}
          onPress={handleAceptar}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.upperBar}>
        <GoBackButton navigation={navigation} />
      </View>
      <View style={styles.container}>
        {/* <Image
        source={
          user.profile.photo
            ? {uri: user.profile.photo.url_half}
            : require('../../../assets/foto_perfil_superior.png')
        }
        style={styles.circle_image}
      /> */}

        <View>
          <Text
            style={{
              color: 'yellow',
              fontSize: 32,
              textDecorationLine: 'underline',
              marginTop: -10,
            }}>
            Editar perfil
          </Text>
        </View>
        {editUsername ? (
          <>
            <TextInput
              style={styles.userNameTextInput}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Options
              handleAceptar={() => {
                toggleEditUsername(false);
                users_services.edit(id, {display_name: username});
                // Toast.show({
                //   text1: 'Hello',
                //   text2: 'This is some something 👋',
                // });
                dispatch(recoverSession());
              }}
              handleCancelar={() => {
                setUsername(display_name);
                toggleEditUsername(false);
              }}
            />
          </>
        ) : (
          <>
            <Text style={styles.userName}>{username}</Text>
            <FormButton
              buttonTitle="Cambiar nombre de usuario"
              style={styles.action}
              onPress={() => toggleEditUsername(true)}
            />
          </>
        )}

        {editDescription ? (
          <>
            <TextInput
              multiline
              numberOfLines={10}
              style={styles.descriptionTextInput}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <Options
              handleAceptar={() => {
                Keyboard.dismiss();
                setEditingDescription(false);
                profiles_services.edit(profileId, {bio: description});
                dispatch(recoverSession());
              }}
              handleCancelar={() => {
                Keyboard.dismiss();
                setDescription(
                  hasBio
                    ? bio
                    : 'Aun no tenés una descripción. hazle saber al mundo quien eres',
                );
                setEditingDescription(false);
              }}
            />
          </>
        ) : (
          <>
            <Text style={styles.userDescription}>{description}</Text>

            <FormButton
              buttonTitle="Modificar descripcion del perfil"
              style={styles.action}
              onPress={() => setEditingDescription(true)}
            />
          </>
        )}

        <KeyboardSpacer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 24,
  },
  upperBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 35,
    backgroundColor: 'black',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 4,
    width: 250,
    padding: 8,
    paddingHorizontal: 16,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 18,
    textDecorationLine: 'underline',
    marginBottom: 45,
  },
  action: {
    width: 270,
    borderRadius: 5,
    marginTop: 0,
  },
  actionMin: {
    borderRadius: 5,
    marginTop: 0,
    margin: 12,
  },
  circle_image: {
    height: 130,
    width: 130,
    borderRadius: 65,
    marginBottom: 10,
  },
  userName: {
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 18,
    textAlign: 'center',
    color: StylesConfiguration.color,
    marginTop: 24,
    marginBottom: 12,
  },
  userNameTextInput: {
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 18,
    textAlign: 'center',
    color: StylesConfiguration.color,
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'yellow',
    width: 120,
  },
  userDescription: {
    color: StylesConfiguration.color,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 70,
    marginTop: 27,
    marginBottom: 10,
  },
  descriptionTextInput: {
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 18,
    textAlign: 'center',
    color: StylesConfiguration.color,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 10,
    backgroundColor: '#35393F',
    width: 270,
    height: 135,
  },
  at: {
    fontSize: 18,
    marginRight: 2,
    marginBottom: 5,
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    color: StylesConfiguration.color,
  },
  input: {
    width: 250,
  },
  inputBio: {
    width: 250,
    height: 80,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: -10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
  },
});
