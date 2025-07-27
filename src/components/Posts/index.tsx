'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/core/lib';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Post } from '@/store/postSlice';
import { Details } from './components/Details';
import Link from 'next/link';

import s from './index.module.scss';

export function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const queue = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(queue, snapshot => {
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<Post, 'id'>),
            }));
            setPosts(postsData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className={s.posts}>
            {posts.map(post => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                    <Details
                        title={post.title}
                        content={post.content}
                        createdAt={String(post.createdAt)}
                        authorName={post.author.name}
                        authorImage={post.author.photoURL}
                    />
                </Link>
            ))}
        </div>
    );
}
