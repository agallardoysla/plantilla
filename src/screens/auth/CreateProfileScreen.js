import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormButton from '../../components/FormButton';
import StylesConfiguration from '../../utils/StylesConfiguration';
import MatInput from '../../components/MatInput';
import DatePicker from '@react-native-community/datetimepicker';
import {Icon} from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import {AuthContext} from '../../navigation/AuthProvider';
import profiles_services from '../../services/profiles_services';
import users_services from '../../services/users_services';

export default function CreateProfile({navigation}) {
  const today = new Date();
  const [nickname, setNickname] = useState('');
  const [existNickname, setExistNickname] = useState(false);
  const [birthday, setBirthday] = useState(today);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [customGender, setCustomGender] = useState('');
  const [userPosibleLikes, setUserPosibleLikes] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const {user, existProfile} = useContext(AuthContext);
  const [verifyExistProfile, setVerifyExistProfile] = useState(false);

  useEffect(() => {
    if (userPosibleLikes.length === 0) {
      // api.get('users/profilesLikes/').then((res) => {
      //   console.log(res.data);
      //   setUserPosibleLikes(
      //     res.data.map((l) => {
      //       l.elected = false; // se agrega a cada posible gusto si fue elegido o no por el usuario
      //       return l;
      //     })
      //   );
      // });
      setUserPosibleLikes(
        [
          {
            name: 'Deporte',
            id: 0,
          },
          {
            name: 'Arte',
            id: 1,
          },
          {
            name: 'Música',
            id: 2,
          },
          {
            name: 'Comida',
            id: 3,
          },
          {
            name: 'Moda',
            id: 4,
          },
          {
            name: 'Ciencia',
            id: 5,
          },
          {
            name: 'Naturaleza',
            id: 6,
          },
          {
            name: 'Política',
            id: 7,
          },
        ].map((l) => {
          l.elected = false; // se agrega a cada posible gusto si fue elegido o no por el usuario
          return l;
        }),
      );
    }
    updateCanSubmit();
    setVerifyExistProfile(user && !existProfile);
  }, [userPosibleLikes.length, nickname, gender, birthday, user, existProfile]);

  const sameDayAsToday = () =>
    birthday.getDate() === today.getDate() &&
    birthday.getMonth() === today.getMonth() &&
    birthday.getFullYear() === today.getFullYear();

  const getMaximumDate = () => {
    const maxDate = moment(today).subtract(14, 'years');
    const maxDateObj = new Date(
      maxDate.year(),
      maxDate.month(),
      maxDate.date(),
    );
    return maxDateObj;
  };

  const checkNicknameExist = () => {
    // api.get(`users/profiles/${nickname}/existNickname/`).then((res) => {
    //   setExistNickname(res.data.exist);
    // });
  };

  const selectLike = (like) =>
    setUserPosibleLikes(
      userPosibleLikes.map((l) => {
        l.elected = l.id === like.id ? !l.elected : l.elected;
        return l;
      }),
    );

  const updateCanSubmit = () => {
    setCanSubmit(nickname !== '' && !existNickname && !sameDayAsToday() && gender !== '');
  };

  const submitProfile = async () => {
    const profile = {...user.profile};

    const twoDigits = (n) => (n < 10 ? '0' + n : n);
    profile.birth_date = `${birthday.getFullYear()}-${twoDigits(birthday.getMonth() + 1)}-${twoDigits(birthday.getDate())}`;
    profile.gender = gender === 'UNDEFINED2' ? 'UNDEFINED' : gender;
    profile.is_ready = true;

    await profiles_services.edit(user.id, profile);
    await users_services.edit(user.id, {display_name: nickname});

    navigation.navigate('Wellcoming');
  };

  const GenderSelectionCheckbox = (props) => (
    <CheckBox
      // Conf para Android
      tintColors={checkboxConfAndroid}
      // Conf para iOS
      boxType="square"
      tintColor="white"
      onCheckColor="black"
      onFillColor={StylesConfiguration.color}
      onTintColor={StylesConfiguration.color}
      {...props}
    />
  );

  return verifyExistProfile ? 
  (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRATE</Text>
      <View style={styles.formRowCenter}>
        <MatInput
          value={nickname}
          label="Nombre de usuario"
          onChangeText={setNickname}
          onSubmitEditing={checkNicknameExist}
          containerStyle={styles.input}
          renderLeftAccessory={() => <Text style={styles.at}>@</Text>}
          renderRightAccessory={() =>
            existNickname ? <Icon name="clear" color="#ff0000" /> : <></>
          }
          fontSize={18}
          labelFontSize={18}
          error={existNickname ? 'Ya existe otro usuario con este nombre' : ''}
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.text}>Fecha de nacimiento: </Text>
        <Text style={[styles.text, styles.textImportant]}>+13</Text>
        {sameDayAsToday() ? (
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerPlaceholder}>Dia</Text>
            <Text style={styles.datePickerSeparator}>-</Text>
            <Text style={styles.datePickerPlaceholder}>Mes</Text>
            <Text style={styles.datePickerSeparator}>-</Text>
            <Text style={styles.datePickerPlaceholder}>Año</Text>
            <Icon
              name="keyboard-arrow-down"
              style={styles.arrow}
              color={StylesConfiguration.color}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerData}>{birthday.getDate()}</Text>
            <Text style={styles.datePickerSeparator}>-</Text>
            <Text style={styles.datePickerData}>{birthday.getMonth() + 1}</Text>
            <Text style={styles.datePickerSeparator}>-</Text>
            <Text style={styles.datePickerData}>{birthday.getFullYear()}</Text>
            <Icon
              name="keyboard-arrow-down"
              style={styles.arrow}
              color={StylesConfiguration.color}
            />
          </TouchableOpacity>
        )}
        {showDatePicker && (
          <DatePicker
            value={birthday}
            onChange={(event, date) => {
              setShowDatePicker(false);
              setBirthday(date);
            }}
            mode="date"
            display="spinner"
            placeholder="Dia-Mes-Año"
            format="DD-MM-YYYY"
            maximumDate={getMaximumDate()}
          />
        )}
      </View>
      <View style={[styles.formRow, styles.formRowStart]}>
        <Text style={styles.text}>Gendero:</Text>
        <View style={styles.selectGender}>
          <View style={[styles.formRow, styles.genderCheckbox]}>
            <Text style={styles.text}>Hombre</Text>
            <GenderSelectionCheckbox
              value={gender === 'MALE'}
              onValueChange={(newValue) => {
                setCustomGender('');
                setGender(newValue ? 'MALE' : '');
              }}
            />
          </View>
          <View style={[styles.formRow, styles.genderCheckbox]}>
            <Text style={styles.text}>Mujer</Text>
            <GenderSelectionCheckbox
              value={gender === 'FEMALE'}
              onValueChange={(newValue) => {
                setCustomGender('');
                setGender(newValue ? 'FEMALE' : '');
              }}
            />
          </View>
          <View style={[styles.formRow, styles.genderCheckbox]}>
            <Text style={styles.text}>Neutro</Text>
            <GenderSelectionCheckbox
              value={gender === 'UNDEFINED'}
              onValueChange={(newValue) => {
                setCustomGender('');
                setGender(newValue ? 'UNDEFINED' : '');
              }}
            />
          </View>
          <View style={[styles.formRow, styles.genderCheckbox]}>
            <Text style={styles.text}>Prefiero no indicarlo</Text>
            <GenderSelectionCheckbox
              value={gender === 'UNDEFINED2'}
              onValueChange={(newValue) => {
                setCustomGender('');
                console.log(customGender);
                setGender(newValue ? 'UNDEFINED2' : '');
              }}
            />
          </View>
          {/* <View style={[styles.formRow, styles.genderCheckbox]}>
            <Text style={styles.text}>Otro:</Text>
            <MatInput
              value={customGender}
              label="Comentanos aquí..."
              onChangeText={(newGender) => {
                setCustomGender(newGender);
                setGender('');
              }}
              containerStyle={styles.input}
              fontSize={14}
              labelFontSize={14}
            />
          </View> */}
        </View>
      </View>
      <View style={styles.formRowCenter}>
        <Text style={styles.text}>
          Queremos conocerte un poco para ofrecerte perfiles similares a tus gustos
        </Text>
      </View>
      <View style={styles.posibleLikesContainer}>
        {userPosibleLikes.map((l, i) => (
          <TouchableOpacity
            key={i}
            style={
              l.elected
                ? [styles.posibleLikes, styles.posibleLikeElected]
                : [styles.posibleLikes]
            }
            onPress={() => selectLike(l)}>
            <Text
              style={
                l.elected
                  ? [styles.posibleLikesname, styles.posibleLikeElected]
                  : [styles.posibleLikesname]
              }>
              {l.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.formRowCenter}>
        <FormButton
          buttonTitle="Continuar"
          onPress={submitProfile}
          style={canSubmit ? styles.canSubmit : styles.notCanSubmit}
          disabled={!canSubmit}
        />
      </View>
    </View>
  ) : (
    <View style={styles.verificationContainer}>
      <Text style={styles.verificationText}>Verificando perfil...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    color: StylesConfiguration.color,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: StylesConfiguration.color,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 16,
  },
  formRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formRowStart: {
    alignItems: 'flex-start',
  },
  datePicker: {
    borderColor: StylesConfiguration.color,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 31,
    marginLeft: 15,
    display: 'flex',
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerPlaceholder: {
    color: 'grey',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: StylesConfiguration.color,
  },
  datePickerData: {
    color: StylesConfiguration.color,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: StylesConfiguration.color,
  },
  datePickerSeparator: {
    color: 'white',
    marginLeft: 3,
    marginRight: 3,
  },
  arrow: {
    marginLeft: 3,
  },
  text: {
    fontSize: 14,
    lineHeight: 15,
    color: 'white',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
  },
  textImportant: {
    color: 'grey',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
  },
  input: {
    width: 250,
  },
  at: {
    fontSize: 18,
    color: 'white',
    marginRight: 30,
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
  },
  selectGender: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginTop: -3,
  },
  genderCheckbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -5,
  },
  genderInput: {
    width: 150,
  },
  posibleLikesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  posibleLikes: {
    padding: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: StylesConfiguration.color,
    marginTop: 8,
    marginLeft: 6,
  },
  posibleLikeElected: {
    backgroundColor: StylesConfiguration.color,
    color: '#000000',
  },
  posibleLikesname: {
    color: 'white',
    fontWeight: '500',
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 14,
  },
  canSubmit: {},
  notCanSubmit: {
    borderColor: 'black',
  },
  verificationContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 28,
    marginBottom: 10,
    color: StylesConfiguration.color,
  },
});

const checkboxConfAndroid = {
  true: StylesConfiguration.color,
  false: 'white',
};
