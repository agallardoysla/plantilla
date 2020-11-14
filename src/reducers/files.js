import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
    name: "files",
    initialState: [],
    reducers: {
        setFiles: (files, action) => {
            files = action.payload
            return files
        },
        addFiles: (files, action) => {
            files = [...files, ...action.payload]
            return files
        },
        resetFiles: (files) => {
            files = []
            return files
        }
    }
})

export const {
    setFiles,
    addFiles,
    resetFiles
} = filesSlice.actions

export const getFiles = state => state.files
export const getFile = id => state => state.files.filter(f => f.id === id)[0]

export default filesSlice.reducer