'use client';

import React, { useState } from 'react';
import { ModalWindow } from '../ModalWindow';

import s from '../../app/blog/page.module.scss';

export const BlogHeader = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModalWindow = (): void => setIsOpen(prev => !prev);

    return (
        <>
            <div className={s.blog__header}>
                <p className={s.blog__recommended}>Blog Posts</p>
                <button className={s.blog__create} onClick={toggleModalWindow}>
                    Create post
                </button>
            </div>
            {isOpen && <ModalWindow actionType="create" toggleModalWindow={toggleModalWindow} />}
        </>
    );
};
