import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../../reducers/loggedUser';
import StylesConfiguration from '../../utils/StylesConfiguration';
import CommentCreated from './components/CommentCreated';
import FollowRequestAccepted from './components/FollowRequestAccepted';
import FollowRequestReceived from './components/FollowRequestReceived';
import PostComment from './components/PostComment';
import PostReaction from './components/PostReaction';
import ProfileReaction from './components/ProfileReaction';

export default function Notification({notification, navigation, goToProfile}) {
  const loggedUser = useSelector(getLoggedUser);

  const notificationsTypes = {
    follow_request_received: {
      Component: loggedUser.profile.is_private
        ? FollowRequestReceived
        : FollowRequestAccepted,
      params: {notification, goToProfile: goToProfile(notification)},
      action: () => {},
    },
    follow_request_accepted: {
      Component: FollowRequestAccepted,
      params: {notification, goToProfile: goToProfile(notification)},
      action: () => {
        navigation.navigate('OtherProfileGroup', {
          screen: 'OtherProfile',
          params: {
            user_id: notification.from_user.user_id,
          },
        });
      },
    },
    comment_comment_created: {
      Component: CommentCreated,
      params: {notification, goToProfile: goToProfile(notification)},
      action: () => {
        console.log('comment_comment_created', notification);
        navigation.navigate('PostGroup', {
          screen: 'PublicationDetails',
          params: {
            postId: notification.related_to.post_id,
          },
        });
      },
    },
    post_reaction_created: {
      Component: PostReaction,
      params: {notification, goToProfile: goToProfile(notification)},
      action: () => {
        console.log('post_reaction_created', notification);
        navigation.navigate('PostGroup', {
          screen: 'PublicationDetails',
          params: {
            postId: notification.related_to.relation_to.id,
          },
        });
      },
    },
    post_comment_created: {
      Component: PostComment,
      params: {notification, goToProfile: goToProfile(notification)},
      action: () => {
        console.log('post_comment_created', notification);
        navigation.navigate('PostGroup', {
          screen: 'PublicationDetails',
          params: {
            postId: notification.related_to.post_id,
          },
        });
      },
    },
    profile_reaction_created: {
      Component: ProfileReaction,
      params: {notification, goToProfile: goToProfile(notification)},
      action: () => {
        navigation.navigate('OtherProfileGroup', {
          screen: 'OtherProfile',
          params: {
            user_id: notification.from_user.user_id,
          },
        });
      },
    },
  };

  const getOnPress = () => {
    const type = notificationsTypes[notification.event];
    return type ? type.action() : null;
  };

  const getType = () => {
    const type = notificationsTypes[notification.event];
    return type ? <type.Component {...type.params} /> : null;
  };

  return (
    <TouchableOpacity onPress={getOnPress} style={styles.container}>
      <View style={styles.userImgContainer}>
        <Image
          style={styles.userImg}
          source={{
            uri:
              notification.from_user.photo ||
              'https://images.pexels.com/photos/5422694/pexels-photo-5422694.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
        />
      </View>
      {getType()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    height: 70,
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
    width: '60%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  detail: {
    fontSize: 15,
    color: 'white',
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
