import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormButton from '../../components/FormButton';
import StylesConfiguration from '../../utils/StylesConfiguration';
import MatInput from '../../components/MatInput';
import DatePicker from '@react-native-community/datetimepicker';
import {Icon} from 'react-native-elements';

export default function CreateProfile() {
  const today = new Date();
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState(today);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sex, setSex] = useState('');

  const sameDayAsToday = (newBirthday) =>
    birthday.getDate() === today.getDate() &&
    birthday.getMonth() === today.getMonth() &&
    birthday.getFullYear() === today.getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRATE</Text>
      <View style={styles.nicknameRow}>
        <MatInput
          value={nickname}
          label="Nombre de usuario"
          onChangeText={setNickname}
          containerStyle={styles.input}
          renderLeftAccessory={() => <Text style={styles.at}>@</Text>}
          fontSize={18}
          labelFontSize={18}
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.text}>Fecha de nacimiento: </Text>
        <Text style={[styles.text, styles.textImportant]}>+13</Text>
        {sameDayAsToday(birthday) ? (
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
          />
        )}
      </View>
      <View style={styles.formRow}>
        <Text style={styles.text}>Sexo:</Text>
        <View style={styles.selectSex}>
          <View style={styles.formRow}>
            <Text style={styles.text}>Hombre</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.text}>Mujer</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.text}>Neutro</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.text}>Prefiero no indicarlo</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.text}>Otro:</Text>
          </View>
        </View>
      </View>
      <FormButton buttonTitle="Logout" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
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
  nicknameRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
  selectSex: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 30,
  },
  sexInput: {
    width: 150,
  },
});
