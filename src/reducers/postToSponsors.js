import { createSlice } from '@reduxjs/toolkit';

export const PostToSponsorsSlice = createSlice({
    name: "post_to_sponsors",
    initialState: [],
    reducers: {
        setPostToSponsors: (postToSponsors, action) => {
            postToSponsors = action.payload
            return postToSponsors
        },
        addPostToSponsors: (postToSponsors, action) => {
            postToSponsors = [...postToSponsors, ...action.payload]
            return postToSponsors
        },
        resetPostToSponsors: (postToSponsors) => {
            postToSponsors = []
            return postToSponsors
        }
    }
})

export const {
    setPostToSponsors,
    addPostToSponsors,
    resetPostToSponsors
} = PostToSponsorsSlice.actions

export const getPostToSponsors = state => state.postToSponsors
export const getPostToSponsor = id => state => state.postToSponsors.filter(p => p.id === id)[0]

export default PostToSponsorsSlice.reducer