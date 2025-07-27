import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/core/lib';

export type Post = {
    id?: string;
    title: string;
    content: string;
    createdAt?: string;
    authorId: string;
};

const initialState = {
    posts: [] as Post[],
    loading: false,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const snapshot = await getDocs(collection(db, 'posts'));
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Post[];
});

export const addPost = createAsyncThunk(
    'posts/addPost',
    async ({ title, content, authorId }: Post) => {
        const docRef = await addDoc(collection(db, 'posts'), {
            title,
            content,
            authorId,
            createdAt: new Date().toISOString(),
        });
        return { title, content, authorId, id: docRef.id };
    },
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            });
    },
});

export default postsSlice.reducer;
