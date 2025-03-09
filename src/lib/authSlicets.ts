import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string | null;
}

const initialState: UserState = {
    email: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        logout: (state) => {
            state.email = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;