import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {

            state.loading = false;
        },
        userData: (state, action) => {

            state.user = action.payload
            state.isAuthenticated = true
        },
    }
})

export const {userData, startLoading, stopLoading} = userSlice.actions
export default userSlice.reducer