'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addPost } from '@/store/postSlice';

import s from './index.module.scss';

const schema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

interface ModalProps {
    toggleModalWindow: () => void;
}

export const ModalWindow = ({ toggleModalWindow }: ModalProps) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        if (!user?.uid) return;
        await dispatch(
            addPost({
                ...data,
                authorId: user.uid,
                author: {
                    name: String(user.userName),
                    uid: user.uid,
                    photoURL: String(user.photoURL),
                },
                comments: [],
            }),
        );
        toggleModalWindow();
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
                            Create
                        </button>
                        <button onClick={toggleModalWindow} className={s.window__close}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
