
const goToOwnerProfile = () => {
  navigation.navigate('OtherProfileGroup', {
    screen: 'OtherProfile',
    params: {
      user_id: post.user_id,
    },
  });
};


  const getAndSetShowComments = () => {
    // if (!firstTimeLoadingComments) {
    //   setShowComments(!showComments);
    //   console.log('get comments', showComments, loadingComments);
    // } else {
    //   setFirstTimeLoadingComments(false);
    // }
    // setLoadingComments(true);
    // if (showComments) {
    //   posts_services.getComments(postId).then((res) => {
    //     setLoadingComments(false);
    //   });
    // } else {
    //   setLoadingComments(false);
    //   setShowComments(true);
    // }
  };

  const newCommentCallback = (comment) => {
    setSavingComment(false);
  };

  const AddLike = async () => {
    try {
      //si contiene algo lo elimino si no lo agrego
      if (getILiked()) {
        posts_services.deleteReaction(postId);
        dispatch(removePostReaction(reactionId));
      } else {
        posts_services.addReaction(postId, 2);
        dispatch(addPostReactions([createPostReaction(postId, loggedUser.id)]));
        // setLikesCounter(likesCounter + 1);
      }
    } catch (error) {
      console.log('Error de agregar like' + error);
    }
  };

  const goToPost = () => {
    navigation.navigate('PostGroup', {
      screen: 'PublicationDetails',
      params: {
        postId,
      },
    });
  };

  const sharePost = () => {
    dispatch(setPostToShare(post));
    dispatch(setShowSharePost(true));
  };
