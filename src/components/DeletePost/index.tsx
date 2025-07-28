'use client';

import { useAppDispatch } from '@/hooks';
import { deletePost } from '@/store/postSlice';
import { useRouter } from 'next/navigation';
import { Routes as RouteEnum } from '@/core/enum';

import s from './index.module.scss';

interface DeletePostProps {
    postId: string;
    authorId: string | null;
    currentUserId: string | null;
}

export const DeletePost = ({ postId, authorId, currentUserId }: DeletePostProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    if (authorId !== currentUserId) return null;

    const handleDeletePost = (): void => {
        dispatch(deletePost({ id: postId }));
        router.push(RouteEnum.General);
    };

    return (
        <button onClick={handleDeletePost} className={s.delete}>
            Delete Post
        </button>
    );
};
