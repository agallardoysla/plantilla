import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';
import Modal from 'react-native-modal';
import IconMessage from '../../../components/IconMessage';
import FormSearchInput from '../../../components/FormSearchInput';
import chats_services from '../../../services/chats_services';
import users_services from '../../../services/users_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import { useDispatch, useSelector } from 'react-redux';
import { getShowSharePost, setShowSharePost } from '../../../reducers/showSharePost';
import { getPostToShare } from '../../../reducers/postToShare';

export default function SharePost() {
  const [valueSearch, setValueSearch] = useState('');
  const [originalUsersSearched, setOriginalUsersSearched] = useState([]);
  const [usersSearched, setUsersSearched] = useState([]);
  const showSharePost = useSelector(getShowSharePost);
  const sharedPost = useSelector(getPostToShare);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const res = await users_services.getContext({
        search: '',
      });
      setUsersSearched(res.data);
      setOriginalUsersSearched(res.data); // mover esta logica a HomeStack
    };
    init();
  }, []);

  useEffect(() => {
    setUsersSearched(originalUsersSearched);
    setValueSearch('');
  }, [showSharePost]);

  const showSearch = async (seachedString) => {
    setValueSearch(seachedString);
    if (seachedString.length > 0) {
      setUsersSearched(
        originalUsersSearched.filter((u) =>
          u.display_name.toLowerCase().includes(seachedString.toLowerCase()),
        ),
      );
      if (seachedString.length >= 3) {
        const res = await users_services.getContext({
          search: seachedString,
        });
        setUsersSearched(res.data);
      }
    } else {
      setUsersSearched(originalUsersSearched);
    }
  };

  const showUserInfo = (user) => {
    return user.display_name.slice(0, 20);
  };

  const closeModal = () => dispatch(setShowSharePost(false));

  const shareSelectedPost = (userId) => {
    // console.warn(userId);
    //console.log(userId, `[post:${sharedPost.id}]`);
    chats_services.sendMessage(userId, { text: `[post:${sharedPost.id}]` });
    closeModal();
  };

  const SearchedProfileItem = ({ item }) => {
    return (
      <View style={styles.user}>
        <Image
          source={require('../../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.userName}>{showUserInfo(item)}</Text>

        <IconMessage
          style={styles.sendMessage}
          onPress={() => shareSelectedPost(item.id)}
        />
      </View>
    );
  };

  return (
    <Modal
      isVisible={showSharePost}
      style={styles.shareModal}
      swipeDirection={['up', 'left', 'right', 'down']}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View style={styles.shareModalContent}>
        <FormSearchInput value={valueSearch} onChangeText={showSearch} />
        {usersSearched.length > 0 ? (
          <FlatList
            style={styles.usersList}
            data={usersSearched}
            renderItem={SearchedProfileItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  shareModal: {
    height: 370,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    margin: 0,
    padding: 0,
  },
  shareModalContent: {
    height: 370,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: 'black',
    margin: 0,
  },
  usersList: {
    height: 280,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  userName: {
    color: StylesConfiguration.color,
  },
  image: {
    marginHorizontal: 10,
  },
  sendMessage: {
    height: 40,
    width: 60,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
