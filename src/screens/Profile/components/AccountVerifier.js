import React from 'react';
import {StyleSheet} from 'react-native';
import VerifyButton from '../../../components/VerifyButton';


export default function MyProfileRightColumn({navigation}) {
  return <VerifyButton buttonTitle="Verify" onPress={() => navigation.navigate('VerifyAccount', {navigation: navigation})}/>;
};