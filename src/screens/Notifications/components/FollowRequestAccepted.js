import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateFormatter from '../../../components/DateFormatter';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import Icon from '../../../components/Icon';

export default function FollowRequestAccepted({ notification, goToProfile }) {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.detail}>
          <Text onPress={goToProfile} style={styles.otherName}>
            @{notification.from_user.display_name}
          </Text>{' '}
          te sigue, queres seguirlo vos tambien?
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
});
