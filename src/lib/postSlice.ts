import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPost {
    id: number;
    content: string;
    createdAt: string;
    author: string;
}

interface PostState {
    posts: IPost[];
}

const initialState: PostState = {
    posts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state: PostState, action: PayloadAction<IPost[]>) => {
            state.posts = action.payload;
        },
        addPost: (state: PostState, action: PayloadAction<IPost>) => {
            state.posts.push(action.payload);
        },
    },
});

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;