import { createSlice } from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments: (comments, action) => {
            comments = action.payload
            return comments
        },
        addComments: (comments, action) => {
            comments = [...comments, ...action.payload]
            return comments
        },
        resetComments: (comments) => {
            comments = []
            return comments
        }
    }
})

export const {
    setComments,
    addComments,
    resetComments
} = commentsSlice.actions

export const getComments = state => state.comments
export const getComment = id => state => state.comments.filter(c => c.id === id)[0]

export default commentsSlice.reducer