'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addComment } from '@/store/postSlice';

import s from './index.module.scss';

const schema = z.object({
    text: z.string().min(1, 'Comment cannot be empty'),
});

type CommentForm = z.infer<typeof schema>;

interface CommentsProps {
    postId: string;
}

export const Comments = ({ postId }: CommentsProps) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CommentForm>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: CommentForm) => {
        if (!user?.uid) return;

        const commentData = {
            userImage: String(user.photoURL),
            userName: String(user.userName),
            createdAt: new Date().toISOString(),
            text: data.text,
        };

        await dispatch(addComment({ postId, comment: commentData }));
        reset();
    };

    return (
        <form className={s.comments} onSubmit={handleSubmit(onSubmit)}>
            <textarea
                {...register('text')}
                placeholder="Write your comment..."
                className={s.comments__textarea}
            />
            {errors.text && <p className={s.comments__error}>{errors.text.message}</p>}
            <div className={s.comments__respond}>
                <button type="submit" className={s.comments__btn}>
                    Respond
                </button>
            </div>
        </form>
    );
};
