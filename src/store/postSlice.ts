import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/core/lib';
import { v4 as uuidv4 } from 'uuid';

interface AuthorProperties {
    name: string;
    photoURL: string;
    uid: string;
}

interface CommentProperties {
    id: string;
    userImage: string;
    userName: string;
    createdAt: string;
    text: string;
}

export type Post = {
    id?: string;
    title: string;
    content: string;
    createdAt?: string;
    authorId: string | null;
    author: AuthorProperties;
    comments: CommentProperties[];
};

interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
    const snapshot = await getDocs(collection(db, 'posts'));
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Post);
});

export const addPost = createAsyncThunk<Post, Omit<Post, 'id' | 'createdAt'>>(
    'posts/addPost',
    async ({ title, content, authorId, author, comments }) => {
        const createdAt = new Date().toISOString();
        const docRef = await addDoc(collection(db, 'posts'), {
            title,
            content,
            authorId,
            createdAt,
            author,
            comments,
        });
        return { title, content, authorId, id: docRef.id, createdAt, author, comments };
    },
);

export const updatePost = createAsyncThunk<
    { id: string; title: string; content: string },
    { id: string; title: string; content: string }
>('posts/updatePost', async ({ id, title, content }, { rejectWithValue }) => {
    const postDocRef = doc(db, 'posts', id);
    try {
        await updateDoc(postDocRef, { title, content });
        return { id, title, content };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Failed to update post');
    }
});

export const deletePost = createAsyncThunk<string, { id: string }>(
    'posts/deletePost',
    async ({ id }, { rejectWithValue }) => {
        try {
            const postDoc = doc(db, 'posts', id);
            await deleteDoc(postDoc);
            return id;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to delete post');
        }
    },
);

export const addComment = createAsyncThunk<
    { postId: string; comment: CommentProperties },
    { postId: string; comment: Omit<CommentProperties, 'id'> }
>('posts/addComment', async ({ postId, comment }, { rejectWithValue }) => {
    try {
        const commentWithId = {
            ...comment,
            id: uuidv4(),
        };

        const postRef = doc(db, 'posts', postId);
        const postSnap = await getDocs(collection(db, 'posts'));
        const currentPost = postSnap.docs.find(doc => doc.id === postId);

        if (!currentPost) {
            return rejectWithValue('Post not found');
        }

        const existingComments = currentPost.data().comments || [];

        await updateDoc(postRef, {
            comments: [...existingComments, commentWithId],
        });

        return { postId, comment: commentWithId };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Failed to add comment');
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(addPost.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add post';
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update post';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete post';
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { postId, comment } = action.payload;
                const post = state.posts.find(p => p.id === postId);
                if (post) {
                    post.comments.push(comment);
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add comment';
            });
    },
});

export default postsSlice.reducer;
