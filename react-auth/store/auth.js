import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = {
    token:'',
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers:{
        login: (state,action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.token = '';
            state.isLoggedIn = false
        }
    }
});

const store = configureStore({
    reducer: authSlice.reducer
});

export const authActions = authSlice.actions;

export default store;