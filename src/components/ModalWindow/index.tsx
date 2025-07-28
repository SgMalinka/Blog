'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addPost, updatePost } from '@/store/postSlice';
import { useRouter } from 'next/navigation';
import { Routes as RouteEnum } from '@/core/enum';

import s from './index.module.scss';

const schema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

interface ModalProps {
    actionType: 'create' | 'update';
    toggleModalWindow: () => void;
    postId?: string;
    title?: string;
    content?: string;
}

export const ModalWindow = ({
    toggleModalWindow,
    actionType,
    postId,
    title = '',
    content = '',
}: ModalProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(state => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title,
            content,
        },
    });

    const onSubmit = async (data: FormData) => {
        if (!user?.uid) return;

        if (actionType === 'create') {
            await dispatch(
                addPost({
                    title: data.title,
                    content: data.content,
                    authorId: user.uid,
                    author: {
                        name: String(user.userName),
                        uid: user.uid,
                        photoURL: String(user.photoURL),
                    },
                    comments: [],
                }),
            );
        } else if (actionType === 'update' && postId) {
            await dispatch(updatePost({ id: postId, title: data.title, content: data.content }));
        }

        toggleModalWindow();
        router.push(RouteEnum.General);
    };

    return (
        <div className={s.window}>
            <div className={s.window__backdrop}></div>
            <div className={s.window__content}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.window__form}>
                    <input {...register('title')} placeholder="Title" className={s.window__input} />
                    {errors.title && <p className={s.window__error}>{errors.title.message}</p>}
                    <textarea
                        {...register('content')}
                        placeholder="Content"
                        rows={5}
                        className={s.window__textarea}
                    />
                    {errors.content && <p className={s.window__error}>{errors.content.message}</p>}
                    <div className={s.window__block}>
                        <button type="submit" className={s.window__submit}>
                            {actionType === 'create' ? 'Create' : 'Update Post'}
                        </button>
                        <button
                            type="button"
                            onClick={toggleModalWindow}
                            className={s.window__close}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
