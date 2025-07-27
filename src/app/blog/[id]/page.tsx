import { getTimeAgo } from '@/core/utils';
import { Comments } from '@/components';
import Image from 'next/image';
import { fetchPostsServer } from '@/core/utils/fetchPosts';

import s from './page.module.scss';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const posts = await fetchPostsServer();
    const post = posts.find(item => item.id === id);

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
                    <p>{getTimeAgo(String(post.createdAt))}</p>
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
