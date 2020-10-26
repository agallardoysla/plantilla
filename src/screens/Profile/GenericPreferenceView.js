import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';
import GoBackButton from '../../components/GoBackButton';

export default function GenericPreferenceView({title, children, style, navigation}) {

  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <GoBackButton style={styles.goBackButon} navigation={navigation} />
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Image
          style={styles.tuercaBlanca}
          source={require('../../assets/tuerca_blanca_grande.png')}
        />
      </View>
      <View style={[styles.container, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 8,
  },
  goBackButon: {
    alignSelf: 'flex-start',
  },
  title: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 24,
    textDecorationLine: 'underline',
    marginHorizontal: 4,
  },
  tuercaBlanca: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});
