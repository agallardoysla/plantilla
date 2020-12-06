import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import FormButtonPatreon from '../../../components/FormButtonPatreon';
import MyProfileRightColumn from './MyProfileRightColumn';
import OtherProfileRightColumn from './OtherProfileRightColumn';

export default function ProfileRightColumn({isLoggedUser, style, navigation}) {
  const user = useSelector((state) => state.session.user);

  const {sponsored_by} = user;
  const hasSponsors = sponsored_by.length > 0;
  console.log('user', user);

  return (
    <View style={style}>
      {hasSponsors ? (
        <>
          <Text style={styles.textPatreon}>Patrocinado por:</Text>
          {sponsored_by.map((patreon, i) => (
            <FormButtonPatreon buttonTitle={patreon.name} key={i} />
          ))}
        </>
      ) : (
        <Text style={{...styles.textPatreon, textAlign: 'center'}}>
          {isLoggedUser
            ? 'Aun no tienes patrocinadores'
            : 'Esta cuenta aun no tiene patrocinadores.'}
        </Text>
      )}

      {isLoggedUser ? <MyProfileRightColumn navigation={navigation} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  textPatreon: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    minWidth: 100,
  },
});
