'use client';

import { useState } from 'react';
import { ModalWindow } from '../ModalWindow';

import s from './index.module.scss';

interface DeletePostProps {
    postId: string;
    authorId: string | null;
    currentUserId: string | null;
    title: string | null;
    content: string | null;
}

export const UpdatePost = ({
    postId,
    authorId,
    currentUserId,
    title,
    content,
}: DeletePostProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    if (authorId !== currentUserId) return null;

    const toggleModalWindow = (): void => setIsOpen(prev => !prev);

    return (
        <>
            <button className={s.update} onClick={toggleModalWindow}>
                Update Post
            </button>
            {isOpen && (
                <ModalWindow
                    toggleModalWindow={toggleModalWindow}
                    postId={postId}
                    actionType="update"
                    title={String(title)}
                    content={String(content)}
                />
            )}
        </>
    );
};
