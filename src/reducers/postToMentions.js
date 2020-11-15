import { createSlice } from '@reduxjs/toolkit';

export const postToMentionsSlice = createSlice({
    name: "post_to_mentions",
    initialState: [],
    reducers: {
        setPostToMentions: (postToMentions, action) => {
            postToMentions = action.payload
            return postToMentions
        },
        addPostToMentions: (postToMentions, action) => {
            postToMentions = [...postToMentions, ...action.payload]
            return postToMentions
        },
        resetPostToMentions: (postToMentions) => {
            postToMentions = []
            return postToMentions
        }
    }
})

export const {
    setPostToMentions,
    addPostToMentions,
    resetPostToMentions
} = postToMentionsSlice.actions

export const getPostToMentions = state => state.postToMentions
export const getPostToMention = id => state => state.postToMentions.filter(p => p.id === id)[0]

export default postToMentionsSlice.reducer