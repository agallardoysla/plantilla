import { createSlice } from '@reduxjs/toolkit';

export const postToFilesSlice = createSlice({
    name: "post_to_files",
    initialState: [],
    reducers: {
        setPostToFiles: (postToFiles, action) => {
            postToFiles = action.payload
            return postToFiles
        },
        addPostToFiles: (postToFiles, action) => {
            postToFiles = [...postToFiles, ...action.payload]
            return postToFiles
        },
        resetPostToFiles: (postToFiles) => {
            postToFiles = []
            return postToFiles
        }
    }
})

export const {
    setPostToFiles,
    addPostToFiles,
    resetPostToFiles
} = postToFilesSlice.actions

export const getPostToFiles = state => state.postToFiles
export const getPostToFile = id => state => state.postToFiles.filter(p => p.id === id)[0]

export default postToFilesSlice.reducer