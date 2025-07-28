import { getTimeAgo } from '@/core/utils';
import { DeletePost, LiveComments, UpdatePost } from '@/components';
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
                    <div className={s.post__user__info}>
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
                    <div>
                        <DeletePost
                            postId={post.id!}
                            authorId={post.authorId!}
                            currentUserId={post.author.uid}
                        />
                        <UpdatePost
                            postId={post.id!}
                            authorId={post.authorId!}
                            currentUserId={post.author.uid}
                            title={post.title}
                            content={post.content}
                        />
                    </div>
                </div>
                <p className={s.post__content}>{post.content}</p>
                <LiveComments postId={post.id!} initialComments={post.comments} />
            </div>
        </div>
    );
}
