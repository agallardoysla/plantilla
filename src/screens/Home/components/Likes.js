import React from 'react';
import {Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { batch, useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../../reducers/loggedUser';
import { addPostReactions, createPostReaction, getPostReactions, removePostReaction } from '../../../reducers/postReactions';
import { likePost, unlikePost } from '../../../reducers/posts';
import posts_services from '../../../services/posts_services';
const corazon_gris = require('../../../assets/corazon_gris.png');
const corazon_limon = require('../../../assets/corazon_limon.png');

export default function Likes({ postId }) {
  const postReactions = useSelector(getPostReactions(postId));
  const loggedUser = useSelector(getLoggedUser);
  let myReactionId = 0;
  const dispatch = useDispatch();

  const getILiked = () => {
    const reaction = postReactions.filter((reaction) => reaction.user_id === loggedUser.id);
    myReactionId = reaction.length > 0 ? reaction[0].id : 0;
    return reaction.length > 0;
  };

  const doLike = async () => {
    try {
      //si contiene algo lo elimino si no lo agrego
      if (getILiked()) {
        posts_services.deleteReaction(postId);
        dispatch(unlikePost({postId, reactionId: myReactionId}));
        dispatch(removePostReaction(myReactionId));
      } else {
        posts_services.addReaction(postId, 2);
        const newReaction = createPostReaction(postId, loggedUser.id);
        batch(() => {
          dispatch(likePost({postId, reactionId: newReaction.id}));
          dispatch(addPostReactions([newReaction]));
        });
      }
    } catch (error) {
      console.log('Error de agregar like' + error);
    }
  };

  return (
    <TouchableOpacity onPress={doLike}>
      <Image
        source={getILiked() ? corazon_limon : corazon_gris}
        fadeDuration={0}
      />
    </TouchableOpacity>
  );
};