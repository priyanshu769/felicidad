import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
    name: "toast",
    initialState: {
        showToast: false,
        toastMessage: ""
    },
    reducers: {
        setToast: (state, action) => {
            return {...state, showToast: action.payload.showToast, toastMessage: action.payload.toastMessage}
        }
    }
})

export const {setToast} = toastSlice.actions

export default toastSlice.reducer