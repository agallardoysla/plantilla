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
      <View style={styles.followRequestContainer}>
        <Icon source={'FC_Logo'} color={StylesConfiguration.color} size={40} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
    height: 70,
    backgroundColor: 'red'
  },
  userImgContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailContainer: {
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
  followRequestContainer: {
    width: '18%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeImage: {
    width: 60,
    height: 60,
  },
  challengeContainer: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: StylesConfiguration.color,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeText: {
    fontSize: 15,
    color: 'white',
  },
  commentContainer: {
    width: '18%',
    alignItems: 'center',
  },
  commentImage: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
  },
});
