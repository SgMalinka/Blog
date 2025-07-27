import { blogData } from '@/core/constants/blog-data';
import React from 'react';
import { Details } from './components/Details';
import Link from 'next/link';

import s from './index.module.scss';

export const Posts = () => {
    return (
        <div className={s.posts}>
            {blogData.map(post => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                    <Details
                        title={post.title}
                        content={post.content}
                        createdAt={post.createdAt}
                        authorName={post.author.name}
                        authorImage={post.author.photoURL}
                    />
                </Link>
            ))}
        </div>
    );
};
