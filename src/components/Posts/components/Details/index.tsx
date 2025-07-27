import React from 'react';
import Image from 'next/image';
import { getTimeAgo } from '@/core/utils';

import s from './index.module.scss';

interface DetaildProps {
    title: string;
    content: string;
    createdAt: string;
    authorName: string;
    authorImage: string;
}

export const Details = ({ title, content, createdAt, authorName, authorImage }: DetaildProps) => {
    const timeAgo = getTimeAgo(createdAt);

    return (
        <div className={s.details}>
            <div className={s.details__author}>
                <Image
                    src={authorImage}
                    alt="user photo"
                    width={24}
                    height={24}
                    className={s.details__image}
                />
                <p>{authorName}</p>
                <p>{timeAgo}</p>
            </div>
            <div>
                <p className={s.details__title}>{title}</p>
                <p className={s.details__content}>{content}</p>
            </div>
        </div>
    );
};
