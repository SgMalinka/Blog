'use client';

import React, { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/core/lib';
import { getTimeAgo } from '@/core/utils';
import Image from 'next/image';
import { Comments } from '@/components';
import { Post } from '@/store/postSlice';

import s from '../../app/blog/[id]/page.module.scss';

interface LiveCommentsProps {
    postId: string;
    initialComments: Post['comments'];
}

export const LiveComments = ({ postId, initialComments }: LiveCommentsProps) => {
    const [comments, setComments] = useState(initialComments);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'posts', postId), snapshot => {
            const data = snapshot.data();
            if (data && data.comments) {
                const sortedComments = [...data.comments].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                );
                setComments(sortedComments);
            }
        });
        return () => unsubscribe();
    }, [postId]);

    return (
        <div>
            <div className={s.post__comments}>
                <p className={s.post__comments__responses}>Responses</p>
                <Comments postId={postId} />
            </div>
            <div>
                {comments.map(comment => (
                    <div key={comment.id} className={s.post__user__comment}>
                        <div className={s.post__comments__info}>
                            <Image
                                src={comment.userImage}
                                alt="author photo"
                                width={24}
                                height={24}
                                className={s.post__user__photo}
                            />
                            <p>{comment.userName}</p>
                            <p>{getTimeAgo(comment.createdAt)}</p>
                        </div>
                        <div>
                            <p className={s.post__text}>{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
