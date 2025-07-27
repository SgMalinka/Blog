import { db } from '@/core/lib';
import { collection, getDocs } from 'firebase/firestore';
import { Post } from '@/store/postSlice';

export const fetchPostsServer = async (): Promise<Post[]> => {
    const snapshot = await getDocs(collection(db, 'posts'));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, 'id'>),
    }));
};
