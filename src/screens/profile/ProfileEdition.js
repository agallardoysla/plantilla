import React, {useContext, useState} from 'react';
import StylesConfiguration from '../../utils/StylesConfiguration';
import FormButton from '../../components/FormButton';
import GenericPreferenceView from './GenericPreferenceView';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import profiles_services from '../../services/profiles_services';
import users_services from '../../services/users_services';
import MatInput from '../../components/MatInput';
import Icon from '../../components/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import files_services from '../../services/files_services';

export default function Preferences({navigation}) {
  const {user, setUser} = useContext(AuthContext);
  const [editingNickname, setEditingNickname] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newNickname, setNewNickname] = useState(user.display_name);
  const [newBio, setNewBio] = useState(user.profile.bio);

  const submitProfile = () => {
    user.profile.bio = newBio;
    profiles_services.edit(user.profile.id, user.profile);
    users_services.edit(user.id, {display_name: newNickname});
    setEditingNickname(false);
    setEditingDescription(false);
    user.display_name = newNickname;
    setUser(user);
  };

  const canPublish = () => {
    return newNickname.length > 3;
  };

  const takeNewProfilePhoto = () => {
    const callback = async (images) => {
      navigation.navigate('ProfileEdition');
      console.log('nuevo perfil: ', images);
      var re = /(?:\.([^.]+))?$/;
      let path = {
        url: images[0],
        ext: re.exec(images[0])[1],
      };

      const result = await files_services.createPost(path.url, path.ext);
      console.warn('RESULT', await result.json());
      profiles_services.edit(user.profile.id, {photo: await result.json().id});
    };
    navigation.navigate('NewProfilePhoto', {callback});
  };

  return (
    <GenericPreferenceView
      style={styles.container}
      navigation={navigation}
      title={'EDITAR PERFIL'}>
      <Image
        source={require('../../assets/foto_perfil_superior.png')}
        style={styles.circle_image}
      />
      <FormButton
        buttonTitle="Cambiar foto de perfil"
        style={styles.action}
        onPress={takeNewProfilePhoto}
      />
      {editingNickname ? (
        <View style={styles.row}>
          <MatInput
            value={newNickname}
            label="Nombre de usuario"
            onChangeText={setNewNickname}
            containerStyle={styles.input}
            renderLeftAccessory={() => <Text style={styles.at}>@</Text>}
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
          <Text style={styles.userName}>@{newNickname}</Text>
          <FormButton
            buttonTitle="Cambiar nombre de usuario"
            style={styles.action}
            onPress={() => setEditingNickname(true)}
          />
        </>
      )}
      {editingDescription ? (
          null
      ) : (
        <>
          <Text style={styles.userDescription}>{newBio}</Text>
          <FormButton
            buttonTitle="Modificar descripción del perfil"
            style={styles.action}
            onPress={() => setEditingDescription(true)}
          />
        </>
      )}
    </GenericPreferenceView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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
});
