import React from 'react';
import {StyleSheet} from 'react-native';
import FormButtonVip from '../../../components/FormButtonVip';


export default function MyProfileRightColumn({navigation}) {
  return <FormButtonVip buttonTitle="V.I.P." onPress={() => navigation.navigate('Vip', {navigation: navigation})}/>;
};