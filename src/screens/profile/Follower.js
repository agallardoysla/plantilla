import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FormButton from '../../components/FormButton';
import StylesConfiguration from '../../utils/StylesConfiguration';


const Follower = ({follower, navigation}) => {
  const [userFollowProfile, setUserFollowProfile] = useState(false);

  const goToProfile = () => {
    navigation.navigate('HomeGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: follower.id,
        navigation,
      },
    });
  };

  const goToMyChat = () => {
    navigation.navigate('MyChat', {
      receiver: {
        user_id: follower.id,
        display_name: follower.display_name,
      },
    });
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={goToProfile} style={styles.user}>
        <Image
          source={require('../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.profileName} numberOfLines={2}>
          @{follower.display_name}
        </Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.sobre_amarillo}
          onPress={goToMyChat}>
          <Image
            source={require('../../assets/sobre_amarillo.png')}
            style={styles.sobre_amarillo}
          />
        </TouchableOpacity>
        <FormButton
          buttonTitle={userFollowProfile ? 'Seguido' : 'Seguir'}
          style={styles.followButton}
          textStyle={styles.followButtonText}
        />
        <FormButton
          buttonTitle={'...'}
          style={styles.followButton}
          textStyle={styles.followButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  profileName: {
    color: 'white',
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 15,
    width: 120,
    marginLeft: 5,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  followButton: {
    width: 50,
    marginTop: 0,
    padding: 5,
    marginHorizontal: 5,
    height: 30,
    borderRadius: 5,
  },
  followButtonText: {
    fontSize: 10,
  },
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
});

export default Follower;
