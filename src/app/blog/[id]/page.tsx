'use client';

import { blogData } from '@/core/constants/blog-data';
import { getTimeAgo } from '@/core/utils';
import { useParams } from 'next/navigation';
import { Comments } from '@/components';
import Image from 'next/image';

import s from './page.module.scss';

export default function Page() {
    const params = useParams();
    const post = blogData.find(item => item.id === params.id);

    if (!post) {
        return null;
    }

    return (
        <div className={s.post}>
            <div className={s.post__container}>
                <p className={s.post__title}>{post.title}</p>
                <div className={s.post__user}>
                    <Image
                        src={post.author.photoURL}
                        alt="author photo"
                        width={24}
                        height={24}
                        className={s.post__user__photo}
                    />
                    <p>{post.author.name}</p>
                    <p>{getTimeAgo(post.createdAt)}</p>
                </div>
                <p className={s.post__content}>{post.content}</p>
                <div className={s.post__comments}>
                    <p className={s.post__comments__responses}>Responses</p>
                    <Comments />
                </div>
                <div>
                    {post.comments.map(comment => (
                        <div key={comment.id}>
                            <div className={s.post__user}>
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
        </div>
    );
}
