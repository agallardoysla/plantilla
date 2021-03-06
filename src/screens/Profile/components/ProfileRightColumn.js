import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FormButtonPatreon from '../../../components/FormButtonPatreon';
import MyProfileRightColumn from './MyProfileRightColumn';
import OtherProfileRightColumn from './OtherProfileRightColumn';

export default function ProfileRightColumn({user, isLoggedUser, style, navigation}) {
  const dataPatreon = [
    {
      id: 1,
      name: '@Doggi',
    },
    {
      id: 2,
      name: '@Dogchow',
    },
    {
      id: 3,
      name: '@Pedigree',
    },
  ];

  return (
    <View style={style}>
      <Text style={styles.textPatreon}>Patrocinado por:</Text>
      {dataPatreon.map((patreon, i) => (
        <FormButtonPatreon buttonTitle={patreon.name} key={i} />
      ))}
      {isLoggedUser ? (
        <MyProfileRightColumn navigation={navigation} />
      ) : (
        <OtherProfileRightColumn user={user} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textPatreon: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    minWidth: 100,
  },
});
