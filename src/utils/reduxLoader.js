import { addComments, setComments } from "../reducers/comments";
import { addFiles, setFiles } from "../reducers/files";
import { addPostReactions, setPostReactions } from "../reducers/postReactions";
import { addPosts, setPosts } from "../reducers/posts";
import { addPostToFiles, setPostToFiles } from "../reducers/postsToFiles";
import { addPostToMentions, setPostToMentions } from "../reducers/postToMentions";
import { addPostToSponsors, setPostToSponsors } from "../reducers/postToSponsors";
import { addProfiles, setProfiles } from "../reducers/profiles";
import { addUsers, setUsers } from "../reducers/users";

export const doSetPosts = (postsData, dispatch) => () => {
  dispatch(setPosts(postsData.posts));
  dispatch(setComments(postsData.comments));
  dispatch(setPostReactions(postsData.posts_reactions));
  dispatch(setPostToFiles(postsData.posts_to_files));
  dispatch(setPostToMentions(postsData.posts_to_mentions));
  dispatch(setPostToSponsors(postsData.posts_to_sponsors));
  dispatch(setUsers(postsData.users));
  dispatch(setProfiles(postsData.profiles));
  dispatch(setFiles(postsData.files));
};

export const doAddPosts = (postsData, dispatch) => () => {
  dispatch(addPosts(postsData.posts));
  dispatch(addComments(postsData.comments));
  dispatch(addPostReactions(postsData.posts_reactions));
  dispatch(addPostToFiles(postsData.posts_to_files));
  dispatch(addPostToMentions(postsData.posts_to_mentions));
  dispatch(addPostToSponsors(postsData.posts_to_sponsors));
  dispatch(addUsers(postsData.users));
  dispatch(addProfiles(postsData.profiles));
  dispatch(addFiles(postsData.files));
};
