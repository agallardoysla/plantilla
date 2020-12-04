import React, {useEffect, useState} from 'react';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import FormButton from '../../../components/FormButton';
import GenericPreferenceView from '../components/GenericPreferenceView';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
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

export default function Preferences({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const {id, display_name, profile} = user;
  const {bio} = profile;
  const hasBio = bio !== '__profile__bio__';
  const [editingNickname, setEditingNickname] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newNickname, setNewNickname] = useState(display_name);

  const [newBio, setNewBio] = useState(
    hasBio
      ? bio
      : 'Aun no tenés una descripción. hazle saber al mundo quien eres',
  );

  const submitProfile = () => {
    profiles_services.edit(user.profile.id, user.profile);
    users_services.edit(id, {display_name: newNickname});
    setEditingNickname(false);
    setEditingDescription(false);
    batch(() => {
      dispatch(setNewDisplayName(newNickname));
      dispatch(setNewProfileBio(newBio));
    });
  };

  const canPublish = () => {
    return newNickname.length > 3;
  };

  const takeNewProfilePhoto = () => {
    navigation.navigate('NewProfilePhoto');
  };

  const handleEditProfileFocus = () => {
    if (!hasBio) {
      setNewBio('');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          user.profile.photo
            ? {uri: user.profile.photo.url_half}
            : require('../../../assets/foto_perfil_superior.png')
        }
        style={styles.circle_image}
      />
      {/* <FormButton
        buttonTitle="Cambiar foto de perfil"
        style={styles.action}
        onPress={takeNewProfilePhoto}
      /> */}

      {editingNickname ? (
        <View style={styles.row}>
          <MatInput
            value={newNickname}
            label="Nombre de usuario"
            onChangeText={setNewNickname}
            containerStyle={styles.input}
            fontSize={18}
            labelFontSize={18}
          />
          <TouchableOpacity
            onPress={submitProfile}
            style={styles.editPicture}
            disabled={!canPublish()}>
            <Icon
              source={'done'}
              color={canPublish() ? StylesConfiguration.color : 'grey'}
              size={32}
              style={styles.action}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.userName}>{newNickname}</Text>
          <FormButton
            buttonTitle="Cambiar nombre de usuario"
            style={styles.action}
            onPress={() => setEditingNickname(true)}
          />
        </>
      )}

      <>
        <Text style={styles.userDescription}>{newBio}</Text>
        <FormButton
          buttonTitle="Modificar descripción del perfil"
          style={styles.action}
          onPress={() => setEditingDescription(true)}
        />
      </>
      <KeyboardSpacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 24,
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
    marginTop: 27,
    marginBottom: 10,
  },
  userDescription: {
    color: StylesConfiguration.color,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 70,
    marginTop: 27,
    marginBottom: 10,
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
