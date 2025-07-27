import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
    uid: string | null;
    email: string | null;
    userName: string | null;
    photoURL: string | null;
};

const initialState: UserState = {
    uid: null,
    email: null,
    userName: null,
    photoURL: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.userName = action.payload.userName;
            state.photoURL = action.payload.photoURL;
        },
        clearUser(state) {
            state.uid = null;
            state.email = null;
            state.userName = null;
            state.photoURL = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
