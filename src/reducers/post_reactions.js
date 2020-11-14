import { createSlice } from '@reduxjs/toolkit';

export const postsReactionsSlice = createSlice({
    name: "post_reactions",
    initialState: [],
    reducers: {
        setPostReactions: (postReactions, action) => {
            postReactions = action.payload
            return postReactions
        },
        addPostReactions: (postReactions, action) => {
            postReactions = [...postReactions, ...action.payload]
            return postReactions
        },
        resetPostReactions: (postReactions) => {
            postReactions = []
            return postReactions
        }
    }
})

export const {
    setPostReactions,
    addPostReactions,
    resetPostReactions
} = postsReactionsSlice.actions

export const getPostReactions = state => state.postReactions
export const getPostReaction = id => state => state.postReactions.filter(r => r.id === id)[0]

export default postsReactionsSlice.reducer