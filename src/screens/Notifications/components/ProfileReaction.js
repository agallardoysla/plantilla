import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DateFormatter from '../../../components/DateFormatter';
import Icon from '../../../components/Icon';
import StylesConfiguration from '../../../utils/StylesConfiguration';

export default function ProfileReaction({ notification, goToProfile }) {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.detail}>
          A{' '}
          <Text onPress={goToProfile} style={styles.otherName}>
            @{notification.from_user.display_name}
          </Text>{' '}
          le gusta tu perfil
        </Text>
        <DateFormatter date={notification.created_at} />
      </View>
      <Icon source={'FC_Logo'} color={StylesConfiguration.color} size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
    height: 70,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  detail: {
    fontSize: 15,
    color: 'white',
  },
  otherName: {
    fontSize: 15,
    color: StylesConfiguration.color,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
  },
});
