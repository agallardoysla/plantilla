import React, {useState} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormButton from '../../components/FormButton';
import StylesConfiguration from '../../utils/StylesConfiguration';


const Follower = ({follower, navigation}) => {
  const [userFollowProfile, setUserFollowProfile] = useState(false);

  const goToProfile = () => {
    navigation.navigate('HomeGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: profile.id,
        navigation,
      },
    });
  };

  const goToMyChat = (profile) => {
    navigation.navigate('MyChat', {
      receiver: {
        user_id: profile.id,
        display_name: profile.display_name,
      },
    });
  };

  return (
    <View style={styles.row_content}>
      <Image
        source={require('../../assets/pride-dog_1.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.text}>@{follower.display_name}</Text>
      <TouchableOpacity
        style={styles.sobre_amarillo}
        onPress={() => goToMyChat(follower)}>
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
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  row_content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: window.width,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },
  text: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
  },
  followButton: {
    width: 50,
    marginTop: 0,
    padding: 5,
    marginHorizontal: 5,
    height: 35,
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
